import CreateCabinForm from "../../features/cabins/CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   function handleClose() {
//     setIsOpenModal((prev) => !prev);
//   }
//   return (
//     <div>
//       <Button onClick={handleClose}>Add new Cabin</Button>
//       {isOpenModal && (
//         <Modal onClose={handleClose}>
//           <CreateCabinForm onClose={handleClose} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
