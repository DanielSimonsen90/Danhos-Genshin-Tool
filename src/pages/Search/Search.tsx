import { Outlet, useParams } from "react-router-dom";

export default function Search() {
  const { query } = useParams();
  return query ? <Outlet /> : null;
}