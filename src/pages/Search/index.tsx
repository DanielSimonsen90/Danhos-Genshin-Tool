import { useParams } from "react-router-dom";
import Search from "./Search";

export default function SearchPage() {
  const { query } = useParams();
  return query ? <Search /> : null;
}