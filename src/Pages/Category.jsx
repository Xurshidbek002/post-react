import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { toast } from "react-toastify";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loding, setLoding] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [nameUz, setNameUz] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [images, setImages] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const token = localStorage.getItem("accessToken");
  const modal = () => {
    setopenModal(!openModal);
    setSelectedItem(null);
  };

  const imageUrl = "https://realauto.limsa.uz/api/uploads/images";
  const getCategory = () => {
    setLoding(true);
    axios({
      url: "https://realauto.limsa.uz/api/categories",
      method: "GET",
    })
      .then((res) => {
        setCategories(res.data.data);
      })
      .finally(() => {
        setLoding(false);
      });
  };
  useEffect(() => {
    getCategory();
  }, []);

  const addCategory = () => {
    const formdata = new FormData();
    formdata.append("name_en", nameUz);
    formdata.append("name_ru", nameRu);
    if (images) {
      formdata.append("images", images);
    }
    axios({
      url: `https://realauto.limsa.uz/api/categories/${selectedItem.id}`,
      method: selectedItem ? "PUT" : "POST",
      data: formdata,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setopenModal(false);
        toast.success("Malumot qo'shildi");
        getCategory();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally({
        openModal: false,
      });
  };
  const showEdit = (category) => {
    setSelectedItem(category);
    setopenModal(true);
    setNameUz(category.name_en);
    setNameRu(category.name_ru);
  };
  const deleteCategory = (id) => {
    axios({
      method: "DELETE",
      url: `https://realauto.limsa.uz/api/categories/${selectedItem.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success("Delete");
        getCategory();
        setSelectedItem(null);
      })
      .catch(() => {
        toast.error("Xatolik");
      });
  };

  return (
    <>
      <div className="h-[90vh] overflow-y-scroll scrollbar-hide">
        <div className="flex justify-between py-2 items-center">
          <button
            onClick={modal}
            className="px-3 flex items-center gap-2 py-1 border-2 hover:bg-blue-700 hover:text-white text-blue-700 cursor-pointer font-bold  my-2 rounded-sm border-blue-700"
          >
            Malumot qo'shish
            <BsFileEarmarkPostFill />
          </button>

          <h1 className="text-4xl font-bold text-blue-600">Category</h1>
        </div>
        {openModal ? (
          <div>
            <div
              className="relative z-100"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div
                className="fixed inset-0 bg-gray-900/90 transition-opacity"
                aria-hidden="true"
              ></div>
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden rounded-lg pt-5 pl-5 pr-5 bg-white text-left shadow-xl transition-all">
                    <form
                      action=""
                      className="flex flex-col items-center gap-5"
                    >
                      <h1 className="text-2xl font-bold text-blue-600">
                        {selectedItem ? "Edit modal" : "Malumot qo'shish"}
                      </h1>
                      <input
                        className="border border-gray-500 p-1 rounded-2xl w-full text-center"
                        onChange={(e) => setNameUz(e.target.value)}
                        type="text"
                        placeholder="Name uz"
                        value={nameUz}
                      />
                      <input
                        className="border border-gray-500 p-1 rounded-2xl w-full text-center"
                        onChange={(e) => setNameRu(e.target.value)}
                        type="text"
                        placeholder="Name ru"
                        value={nameRu}
                      />
                      <input
                        onChange={(e) => setImages(e.target.files[0])}
                        type="file"
                        className=" bg-blue-400  w-full rounded-2xl  p-1"
                      />
                      <div className="bg-gray-50  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          onClick={addCategory}
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 sm:ml-3 sm:w-auto"
                        >
                          Save
                        </button>
                        <button
                          onClick={modal}
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5
          pb-10 "
        >
          {loding ? (
            <>
              <div
                className="inline-block h-40 w-40 animate-spin rounded-full border-9  border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] absolute left-[50%] top-[50%]"
                role="status"
              ></div>
            </>
          ) : (
            categories.map((category) => (
              <div
                className="gap-5 bg-gray-300 h-70 rounded-xl relative"
                key={category.id}
              >
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={`${imageUrl}/${category.image_src}`}
                  alt={category.name_en}
                />

                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t rounded-bl-xl rounded-br-xl from-black/40 transform duration-300 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t rounded-bl-xl rounded-br-xl from-black/60 to-transparent"></div>

                <div className="absolute w-full items-center flex justify-between  px-5 z-10 bottom-4">
                  <div className="">
                    <h1 className="text-white text-[24px] text-shadow-sm">
                      Uz: {category.name_en}
                    </h1>
                    <h1 className="text-white text-[24px] text-shadow-sm">
                      Ru: {category.name_ru}
                    </h1>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => showEdit(category)}
                      className="rounded-sm cursor-pointer hover:bg-transparent border-2  border-blue-600 text text-white  bg-blue-600 px-3 py-[1px] "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setSelectedItem(category)}
                      className="rounded-sm cursor-pointer hover:bg-transparent border-2 border-red-600  text text-white bg-red-600 px-3 py-[1px] "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {selectedItem ? (
        <div>
          <div
            className="relative z-100"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-gray-900/90 transition-opacity"
              aria-hidden="true"
            ></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg pt-5 pl-5 pr-5 bg-white text-left shadow-xl transition-all">
                  <h1 className="text-2xl font-bold text-red-500 text-center">
                    O'chirilsinmi?
                  </h1>
                  <div className="bg-gray-50  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={deleteCategory}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedItem(null)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Category;
