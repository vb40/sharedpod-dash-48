
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Tickets = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("*");
  }, [navigate]);

  return null;
};

export default Tickets;
