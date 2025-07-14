import { addAddress, deleteAddress, updateAddress } from "@/Redux/addressSlice";
import {
  Building,
  Check,
  Edit,
  Home,
  MapPin,
  MoreVertical,
  Plus,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function Address({addresses,selectedAddress,setSelectedAddress}) {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    type: "home",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    instructions: "",
  });
  const dispatch=useDispatch()

  

  

  const promoCodes = {
    SAVE20: { discount: 0.2, description: "20% off your order" },
    FIRST10: { discount: 0.1, description: "10% off first order" },
    FREESHIP: { discount: 0, description: "Free delivery", freeShipping: true },
  };
  const AddressMenu = ({ address, onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <button
                onClick={() => {
                  onEdit();
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 rounded-t-lg"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 rounded-b-lg"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  const applyPromoCode = () => {
    const promo = promoCodes[promoCode.toUpperCase()];
    if (promo) {
      setAppliedPromo({ ...promo, code: promoCode.toUpperCase() });
      setShowPromoInput(false);
      setPromoCode("");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const addNewAddress = async () => {
    const formData = newAddress;
  
    if (
      newAddress.street &&
      newAddress.city &&
      newAddress.state &&
      newAddress.zipCode
    ) {
      if (editingAddressId) {
        // Update existing address
        
        const data = await dispatch(updateAddress({formData,AddressId:editingAddressId}));
  
       
  
        if (data.payload?.success) {
          toast.success("update Address successfully");
          setEditingAddressId(null);
          cancelAddressForm()

        } else {
          toast.error("Fetch error!");
        }
      
        setEditingAddressId(null);
      } else {
        // Add new address
     
        const data = await dispatch(addAddress(formData));
  
       
  
        if (data.payload?.success) {
          toast.success("Add Address successfully");
        } else {
          toast.error("Fetch error!");
        }
  
        setShowAddressForm(false);
        setNewAddress({
          type: "home",
          street: "",
          city: "",
          state: "",
          zipCode: "",
          instructions: "",
        });
      }
    }
  };
  

  const editAddress = (address) => {
    setEditingAddressId(address._id);
    setNewAddress({
      type: address.type,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      instructions: address.instructions || "",
    });
    setShowAddressForm(true);
  };

  const deleteaddress = async(addressId) => {
   
    const data = await dispatch(deleteAddress(addressId));
  
       
  
    if (data.payload?.success) {
      toast.success(" Address delete successfully");
      

    } else {
      toast.error("Fetch error!");
    }
  
  };

  const cancelAddressForm = () => {
    setShowAddressForm(false);
    setEditingAddressId(null);
    setNewAddress({
      type: "home",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      instructions: "",
    });
  };
  return (
    <div className="w-1/2">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-orange-500" />
            Delivery Address
          </h3>
          <button
            onClick={() => setShowAddressForm(true)}
            className="text-orange-600 hover:text-orange-800 transition-colors text-sm font-medium flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add New
          </button>
        </div>

        {showAddressForm ? (
          <div className="space-y-4 border-t pt-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setNewAddress({ ...newAddress, type: "home" })}
                className={`flex items-center justify-center py-2 px-3 rounded-xl border transition-colors ${
                  newAddress.type === "home"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </button>
              <button
                onClick={() => setNewAddress({ ...newAddress, type: "work" })}
                className={`flex items-center justify-center py-2 px-3 rounded-xl border transition-colors ${
                  newAddress.type === "work"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Building className="w-4 h-4 mr-2" />
                Work
              </button>
            </div>

            <input
              type="text"
              placeholder="Street Address"
              value={newAddress.street}
              onChange={(e) =>
                setNewAddress({ ...newAddress, street: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
              <input
                type="text"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            <input
              type="text"
              placeholder="ZIP Code"
              value={newAddress.zipCode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, zipCode: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />

            <textarea
              placeholder="Delivery Instructions (Optional)"
              value={newAddress.instructions}
              onChange={(e) =>
                setNewAddress({ ...newAddress, instructions: e.target.value })
              }
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
            />

            <div className="flex space-x-3">
              <button
                onClick={addNewAddress}
                className="flex-1 bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition-colors font-medium"
              >
                {editingAddressId ? "Update Address" : "Save Address"}
              </button>
              <button
                onClick={cancelAddressForm}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((address, index) => (
              <div
                key={address.id}
                onClick={() => setSelectedAddress(index)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedAddress === index
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        address.type === "home"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {address.type === "home" ? (
                        <Home className="w-4 h-4" />
                      ) : (
                        <Building className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">
                          {address.label}
                        </h4>
                        {selectedAddress === index && (
                          <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {address.street}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      {address.instructions && (
                        <p className="text-xs text-gray-500 italic">
                          Note: {address.instructions}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <AddressMenu
                      address={address}
                      onEdit={() => editAddress(address)}
                      onDelete={() => deleteaddress(address._id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Promo Code */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <Tag className="w-4 h-4 mr-2 text-orange-500" />
            Promo Code
          </h3>
        </div>

        {appliedPromo ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-green-800">
                  {appliedPromo.code}
                </p>
                <p className="text-sm text-green-600">
                  {appliedPromo.description}
                </p>
              </div>
              <button
                onClick={removePromoCode}
                className="text-green-600 hover:text-green-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {showPromoInput ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={applyPromoCode}
                    className="flex-1 bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition-colors font-medium"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setShowPromoInput(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowPromoInput(true)}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors font-medium"
              >
                + Add Promo Code
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Address;
