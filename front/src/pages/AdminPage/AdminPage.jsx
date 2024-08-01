import { Link } from "react-router-dom";
import "./AdminPage.css";

function AdminPage() {
  return (
    <>
      <div className="admin-page-buttons">
        <div>
            <h2>Admin console</h2>
        </div>
        <div>
          <Link to="/categories">
            <button type="button" className="btn btn-primary">
              Edit Categories
            </button>
          </Link>
        </div>
        <div>
          <Link to="/addbook">
            <button type="button" className="btn btn-primary">
              Edit Books
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
