import TodoComponent from "./todo";

interface PropTypes {
  id: string;
  index: number;
  displayTodoHandler: (data: JSX.Element) => void;
}

const SideBarTodo = ({ id, index, displayTodoHandler }: PropTypes) => {
  const setDisplayHandler = () => {
    displayTodoHandler(<TodoComponent id={id} />);
  };
  return (
    <div className="relative flex h-[40px] w-[40px] items-center justify-center">
      <div
        className="relative flex h-[30px] w-[30px] items-center justify-center border-[1px] border-white/50"
        onClick={() => setDisplayHandler()}
      >
        <p className="text-[12px] text-white">{index + 1}</p>
      </div>
    </div>
  );
};

export default SideBarTodo;
