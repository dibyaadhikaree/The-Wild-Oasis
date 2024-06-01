/* eslint-disable react/prop-types */
import styled from "styled-components";
import img from "../../data/cabins/cabin-001.jpg";
import { formatCurrency } from "../../utils/helpers";
import ButtonText from "../../ui/ButtonText";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateEditCabin } from "./useCreateEditCabin";

import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import Table from "../../ui/Table";

import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { _id, name, maxCapacity, regularPrice, discount, image } = cabin;

  const { mutate: deleteCabin, isDeleting } = useDeleteCabin();

  const { mutate: createCabin } = useCreateEditCabin();

  return (
    <>
      <Table.Row columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Img src={img} />
        <Cabin> {name} </Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount || 0)}</Discount>

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={_id} />
              <Menus.List id={_id}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={() => {
                    createCabin({
                      ...cabin,
                      id: null,
                      _id: null,
                    });
                  }}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open opens="edit-modal">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="confirm-delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit-modal">
              <CreateCabinForm cabinToUpdate={cabin} />
            </Modal.Window>

            <Modal.Window name="confirm-delete">
              <ConfirmDelete
                resourceName={name}
                onConfirm={() =>
                  deleteCabin({
                    id: _id,
                  })
                }
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
