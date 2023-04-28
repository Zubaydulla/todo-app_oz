import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setDeleteTodos } from "../reduxStore/todoSlice";

const TodoList = ({ todoItem }) => {
  const dispatch = useDispatch();
  const [mark, setMark] = useState(false);
  return (
    <motion.li
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ y: { type: "spring", stiffness: 120 } }}
      onClick={() => setMark(!mark)}
      className={`${
        mark
          ? "border-l-orange-500 border-orange-900"
          : "border-l-green-500 border-green-900"
      } w-full font-titleFont font-medium text-base border border-l-[6px] px-2 py-2 cursor-pointer border-green-500 flex items-center justify-between`}
    >
      {todoItem.todo}
      <span
        onClick={() => dispatch(setDeleteTodos(todoItem._id))}
        className="text-xl text-gray-300 hover:text-red-500 duration-300 cursor-pointer"
      >
        <MdDelete />
      </span>
    </motion.li>
  );
};

export default TodoList;
