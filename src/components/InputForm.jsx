import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import TodoList from "./TodoList";
import ErrorMsg from "./msg/ErrorMsg";
import SuccessMsg from "./msg/SuccessMsg";
import { useDispatch, useSelector } from "react-redux";
import { setAddTodos, setResetTodos, todosList } from "../reduxStore/todoSlice";
import { motion } from "framer-motion";

const InputForm = () => {
  const dispatch = useDispatch();
  const todosListVar = useSelector(todosList);

  const [todoValue, setTodoValue] = useState("");
  const [category, setCategory] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const options = [
    {
      _id: 1000,
      title: "categories",
    },
    {
      _id: 1001,
      title: "personal",
    },
    {
      _id: 1002,
      title: "business",
    },
    {
      _id: 1003,
      title: "others",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      showErr && setShowErr(false);
      showSuccess && setShowSuccess(false);
      console.log(showErr);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showErr, showSuccess]);

  // const timer = setTimeout(() => {
  //   showErr && setShowErr(false);
  //   showSuccess && setShowSuccess(false);
  //   console.log(showErr);
  // }, 2000);

  const handleTodo = (e) => {
    e.preventDefault();
    if (!todoValue) {
      setErrorMsg("Please write your todo!");
      setShowErr(true);
      setShowSuccess(false);
    } else if (!category || category === "categories") {
      setErrorMsg("Select a category!");
      setShowErr(true);
    } else {
      dispatch(
        setAddTodos({
          _id: Math.random(),
          todo: todoValue,
          category: category,
        })
      );
      setTodoValue("");
      setSuccessMsg("Todo added successfully!");
      setShowSuccess(true);
      setShowErr(false);
    }
  };

  return (
    <div className="w-full bg-bodyColor flex flex-col gap-4">
      <div className="flex items-center gap-4 h-12">
        <input
          onChange={(e) => setTodoValue(e.target.value)}
          value={todoValue}
          type="text"
          className="w-[80%] h-full bg-bodyColor border border-gray-400 py-2 px-4 placeholder:text-gray-400 text-white text-base placeholder:text-sm tracking-wide rounded-md outline-none focus:border-orange-600 hover:border-white"
          placeholder="Enter your todo..."
        />
        <div className="w-[20%] h-full relative">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-full text-center capitalize outline-none bg-bodyColor border border-gray-400 px-1 cursor-pointer appearance-none rounded-md focus-visible:border-orange-600 hover:border-white"
            name=""
            id=""
          >
            {options.map((option) => (
              <option key={option._id}>{option.title}</option>
            ))}
          </select>
          <span className="absolute right-3 top-4">
            <FaChevronDown />
          </span>
        </div>
      </div>
      <button
        onClick={handleTodo}
        className="w-full border-[1px] border-gray-400 hover:border-gray-200 duration-300 font-titleFont font-semibold tracking-wider text-gray-300 hover:text-orange-600 h-10 uppercase rounded-md"
      >
        Add To Do
      </button>
      <div className="flex flex-col gap-4">
        <ul className="grid grid-cols-1 gap-4 border border-gray-600 shadow-todoShodow mt-6 p-4">
          {todosListVar.length > 0 ? (
            <>
              {todosListVar.map((todoItem) => (
                <TodoList key={todoItem._id} todoItem={todoItem} />
              ))}
            </>
          ) : (
            <p className="text-center text-base text-yellow-500 font-titleFont font-medium tracking-wide">
              Your todo list is empty
            </p>
          )}
        </ul>
        {todosListVar.length > 0 && (
          <motion.button
            onClick={() => setShowReset(true)}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-40 h-8 text-sm font-titleFont text-orange-500 hover:text-red-500 font-semibold mx-auto bg-transparent border border-gray-500 hover:border-red-500 duration-300"
          >
            Remove todos
          </motion.button>
        )}
      </div>
      {showErr && <ErrorMsg errMsg={errorMsg} />}
      {showSuccess && <SuccessMsg successMsg={successMsg} />}
      {showReset && (
        <div className="w-full h-screen fixed bg-bodyColor top-0 left-0 bg-opacity-60">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 bg-bodyColor border border-red-500 rounded-md z-50 flex flex-col gap-4 shadow-todoShodow">
            <p className="text-xl text-center font-medium text-red-500">
              Are you sure to{" "}
              <span className="font-semibold underline underline-offset-2 decoration-[1px]">
                Remove
              </span>{" "}
              all the todos?
            </p>
            <div className="flex items-center gap-4 justify-center">
              <button
                onClick={() => dispatch(setResetTodos()) && setShowReset(false)}
                className="px-6 py-2 text-base font-titleFont text-orange-500 hover:text-red-500 font-semibold bg-transparent border border-gray-400 hover:border-green-500 duration-300"
              >
                yes
              </button>
              <button
                onClick={() => setShowReset(false)}
                className="px-6 py-2 text-base font-titleFont text-orange-500 hover:text-red-500 font-semibold bg-transparent border border-gray-400 hover:border-green-500 duration-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputForm;
