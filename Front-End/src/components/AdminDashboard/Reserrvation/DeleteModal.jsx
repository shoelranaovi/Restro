import { deleteReservation } from "@/Redux/ReservationSlice";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";


function DeleteModal({setDeleteModal,deleteModal}) {
    console.log(deleteModal)
    const dispatch=useDispatch()


    const confirmDelete = () => {
      dispatch(deleteReservation({reservationId:deleteModal.reservation._id}))
      .unwrap()
      .then((data) => {
        console.log(data)
        if (data.success) {
          toast.success("Reservation delete successfully!");
  
        } else {
          toast.error("Failed to add product");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error adding product");
      });

        setDeleteModal({ open: false, reservation: null });
      };
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Delete Reservation</h3>
        <button 
          onClick={() => setDeleteModal({ open: false, reservation: null })}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete the reservation for <strong>{deleteModal?.reservation?.name}</strong>? 
        This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => setDeleteModal({ open: false, reservation: null })}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={confirmDelete}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
  )
}

export default DeleteModal
