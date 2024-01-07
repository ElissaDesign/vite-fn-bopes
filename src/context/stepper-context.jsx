import { useDispatch } from "react-redux";
import { startup } from "../redux/slices/startupSlice";
import { createContext, useContext, useEffect, useState } from "react";

const StepperContext = createContext({ userData: "", setUserData: null });

export function UseContextProvider({ children }) {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState("");

  useEffect(() => {
    dispatch(startup({ ...userData }));
  }, [dispatch, userData]);

  return (
    <StepperContext.Provider value={{ userData, setUserData }}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const { userData, setUserData } = useContext(StepperContext);

  return { userData, setUserData };
}
