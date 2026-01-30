import {
  LogIn,
  LogOut,
  PlusCircle,
  Edit,
  Trash,
} from "lucide-react";

export const ACTIVITY_ICON: Record<string, JSX.Element> = {
  LOGIN: <LogIn size={16} />,
  LOGOUT: <LogOut size={16} />,
  CREATE_TRANSACTION: <PlusCircle size={16} />,
  UPDATE_TRANSACTION: <Edit size={16} />,
  DELETE_TRANSACTION: <Trash size={16} />,
};
