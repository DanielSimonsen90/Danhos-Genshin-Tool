import { useParams } from "react-router-dom";

export default function SearchQuery() {
  const { query } = useParams();
  return (
    <div> 
      Search Query: {query}    
    </div>
  );
}