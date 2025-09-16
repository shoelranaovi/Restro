// controllers/analyticsController.js
const Analytics = require('../models/Analytics');
const Visitor = require('../models/Visitor');
const PageView = require('../models/PageView');
const Session = require('../models/Session');
const { sendResponse } = require('../utils/sendResponse');
const { ErrorResponse } = require('../utils/errorResponse');

// Get dashboard overview statistics
const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.userId;

    // Get current live visitors
    const liveVisitors = await Visitor.countDocuments({
      user: userId,
      lastSeen: { $gte: new Date(Date.now() - 5 * 60 * 1000) } // Last 5 minutes
    });

    // Get today's page views
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pageViews = await PageView.countDocuments({
      user: userId,
      createdAt: { $gte: today }
    });

    // Get average session time for today
    const sessions = await Session.aggregate([
      {
        $match: {
          user: userId,
          createdAt: { $gte: today },
          endTime: { $exists: true }
        }
      },
      {
        $group: {
          _id: null,
          avgDuration: { $avg: { $subtract: ["$endTime", "$startTime"] } }
        }
      }
    ]);

    const avgSessionTime = sessions.length > 0 
      ? Math.round(sessions[0].avgDuration / 1000 / 60) // Convert to minutes
      : 0;

    // Get average page load speed
    const speedData = await PageView.aggregate([
      {
        $match: {
          user: userId,
          loadTime: { $exists: true },
          createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
        }
      },
      {
        $group: {
          _id: null,
          avgSpeed: { $avg: "$loadTime" }
        }
      }
    ]);

    const avgSpeed = speedData.length > 0 
      ? Number(speedData[0].avgSpeed.toFixed(2))
      : 0;

    const dashboardData = {
      liveVisitors,
      pageViews,
      avgSessionTime: `${Math.floor(avgSessionTime / 60)}:${(avgSessionTime % 60).toString().padStart(2, '0')}`,
      avgSpeed
    };

    return sendResponse(res, 200, "Dashboard stats retrieved successfully", dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Get live visitors count
const getLiveVisitors = async (req, res, next) => {
  try {
    const userId = req.userId;
    const timeThreshold = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago

    const liveVisitors = await Visitor.find({
      user: userId,
      lastSeen: { $gte: timeThreshold }
    })
    .select('ipAddress location userAgent lastSeen')
    .lean();

    const count = liveVisitors.length;

    return sendResponse(res, 200, "Live visitors retrieved successfully", {
      count,
      visitors: liveVisitors
    });
  } catch (error) {
    console.error("Error fetching live visitors:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Get page views data
const getPageViews = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { period = '24h', page } = req.query;

    let timeRange;
    switch (period) {
      case '1h':
        timeRange = new Date(Date.now() - 60 * 60 * 1000);
        break;
      case '24h':
        timeRange = new Date(Date.now() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        timeRange = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        timeRange = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        timeRange = new Date(Date.now() - 24 * 60 * 60 * 1000);
    }

    const matchConditions = {
      user: userId,
      createdAt: { $gte: timeRange }
    };

    if (page) {
      matchConditions.page = { $regex: page, $options: 'i' };
    }

    const pageViews = await PageView.aggregate([
      { $match: matchConditions },
      {
        $group: {
          _id: {
            page: "$page",
            hour: { $dateToString: { format: "%Y-%m-%d %H:00", date: "$createdAt" } }
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.page",
          totalViews: { $sum: "$count" },
          hourlyData: { $push: { hour: "$_id.hour", views: "$count" } }
        }
      },
      { $sort: { totalViews: -1 } }
    ]);

    const totalViews = await PageView.countDocuments(matchConditions);

    return sendResponse(res, 200, "Page views retrieved successfully", {
      totalViews,
      pageViews,
      period
    });
  } catch (error) {
    console.error("Error fetching page views:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Get session data
const getSessionData = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { period = '24h' } = req.query;

    let timeRange;
    switch (period) {
      case '1h':
        timeRange = new Date(Date.now() - 60 * 60 * 1000);
        break;
      case '24h':
        timeRange = new Date(Date.now() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        timeRange = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        timeRange = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        timeRange = new Date(Date.now() - 24 * 60 * 60 * 1000);
    }

    const sessions = await Session.aggregate([
      {
        $match: {
          user: userId,
          startTime: { $gte: timeRange },
          endTime: { $exists: true }
        }
      },
      {
        $addFields: {
          duration: { $subtract: ["$endTime", "$startTime"] }
        }
      },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          avgDuration: { $avg: "$duration" },
          minDuration: { $min: "$duration" },
          maxDuration: { $max: "$duration" }
        }
      }
    ]);

    const sessionData = sessions.length > 0 ? sessions[0] : {
      totalSessions: 0,
      avgDuration: 0,
      minDuration: 0,
      maxDuration: 0
    };

    // Convert duration from milliseconds to readable format
    const formatDuration = (ms) => {
      const minutes = Math.floor(ms / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const formattedData = {
      totalSessions: sessionData.totalSessions,
      avgDuration: formatDuration(sessionData.avgDuration),
      minDuration: formatDuration(sessionData.minDuration),
      maxDuration: formatDuration(sessionData.maxDuration),
      period
    };

    return sendResponse(res, 200, "Session data retrieved successfully", formattedData);
  } catch (error) {
    console.error("Error fetching session data:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Get speed metrics
const getSpeedMetrics = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { period = '24h' } = req.query;

    let timeRange;
    switch (period) {
      case '1h':
        timeRange = new Date(Date.now() - 60 * 60 * 1000);
        break;
      case '24h':
        timeRange = new Date(Date.now() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        timeRange = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      default:
        timeRange = new Date(Date.now() - 24 * 60 * 60 * 1000);
    }

    const speedMetrics = await PageView.aggregate([
      {
        $match: {
          user: userId,
          loadTime: { $exists: true },
          createdAt: { $gte: timeRange }
        }
      },
      {
        $group: {
          _id: null,
          avgSpeed: { $avg: "$loadTime" },
          minSpeed: { $min: "$loadTime" },
          maxSpeed: { $max: "$loadTime" },
          totalMeasurements: { $sum: 1 }
        }
      }
    ]);

    const speedData = speedMetrics.length > 0 ? speedMetrics[0] : {
      avgSpeed: 0,
      minSpeed: 0,
      maxSpeed: 0,
      totalMeasurements: 0
    };

    // Round to 2 decimal places
    const formattedData = {
      avgSpeed: Number(speedData.avgSpeed.toFixed(2)),
      minSpeed: Number(speedData.minSpeed.toFixed(2)),
      maxSpeed: Number(speedData.maxSpeed.toFixed(2)),
      totalMeasurements: speedData.totalMeasurements,
      period
    };

    return sendResponse(res, 200, "Speed metrics retrieved successfully", formattedData);
  } catch (error) {
    console.error("Error fetching speed metrics:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Get visitor history
const getVisitorHistory = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { period = '7d', limit = 50 } = req.query;

    let timeRange;
    switch (period) {
      case '24h':
        timeRange = new Date(Date.now() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        timeRange = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        timeRange = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        timeRange = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    }

    const visitorHistory = await Visitor.aggregate([
      {
        $match: {
          user: userId,
          createdAt: { $gte: timeRange }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
          },
          uniqueVisitors: { $addToSet: "$ipAddress" },
          totalVisits: { $sum: 1 }
        }
      },
      {
        $project: {
          date: "$_id.date",
          uniqueVisitors: { $size: "$uniqueVisitors" },
          totalVisits: 1,
          _id: 0
        }
      },
      { $sort: { date: -1 } },
      { $limit: parseInt(limit) }
    ]);

    return sendResponse(res, 200, "Visitor history retrieved successfully", {
      history: visitorHistory,
      period
    });
  } catch (error) {
    console.error("Error fetching visitor history:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Update/record visitor count
const updateVisitorCount = async (req, res, next) => {
  try {
    const { ipAddress, userAgent, location, referrer } = req.body;

    if (!ipAddress) {
      return next(new ErrorResponse("IP address is required", 400));
    }

    // Find or create visitor
    let visitor = await Visitor.findOne({ ipAddress });

    if (visitor) {
      // Update existing visitor
      visitor.lastSeen = new Date();
      visitor.visitCount += 1;
      if (location) visitor.location = location;
      if (userAgent) visitor.userAgent = userAgent;
      if (referrer) visitor.lastReferrer = referrer;
    } else {
      // Create new visitor
      visitor = new Visitor({
        ipAddress,
        userAgent: userAgent || 'Unknown',
        location: location || 'Unknown',
        firstVisit: new Date(),
        lastSeen: new Date(),
        visitCount: 1,
        lastReferrer: referrer
      });
    }

    await visitor.save();

    return sendResponse(res, 200, "Visitor data updated successfully", {
      visitorId: visitor._id,
      isNewVisitor: visitor.visitCount === 1
    });
  } catch (error) {
    console.error("Error updating visitor count:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Record page view
const recordPageView = async (req, res, next) => {
  try {
    const { page, title, referrer, loadTime, visitorId } = req.body;

    if (!page) {
      return next(new ErrorResponse("Page URL is required", 400));
    }

    const pageView = new PageView({
      page,
      title: title || page,
      referrer,
      loadTime,
      visitor: visitorId,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip || req.connection.remoteAddress
    });

    await pageView.save();

    return sendResponse(res, 201, "Page view recorded successfully", {
      pageViewId: pageView._id
    });
  } catch (error) {
    console.error("Error recording page view:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// Record session data
const recordSession = async (req, res, next) => {
  try {
    const { sessionId, action, visitorId, startTime, endTime } = req.body;

    if (!sessionId || !action) {
      return next(new ErrorResponse("Session ID and action are required", 400));
    }

    let session;

    if (action === 'start') {
      // Create new session
      session = new Session({
        sessionId,
        visitor: visitorId,
        startTime: startTime ? new Date(startTime) : new Date(),
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip || req.connection.remoteAddress
      });
    } else if (action === 'end') {
      // Update existing session
      session = await Session.findOne({ sessionId });
      
      if (!session) {
        return next(new ErrorResponse("Session not found", 404));
      }

      session.endTime = endTime ? new Date(endTime) : new Date();
      session.duration = session.endTime - session.startTime;
    }

    await session.save();

    return sendResponse(res, 200, "Session recorded successfully", {
      sessionId: session.sessionId,
      action
    });
  } catch (error) {
    console.error("Error recording session:", error.message);
    return next(new ErrorResponse("Internal server error", 500));
  }
};

module.exports = {
  getDashboardStats,
  getLiveVisitors,
  getPageViews,
  getSessionData,
  getSpeedMetrics,
  getVisitorHistory,
  updateVisitorCount,
  recordPageView,
  recordSession
};
