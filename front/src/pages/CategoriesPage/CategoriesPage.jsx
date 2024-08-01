import { useContext, useEffect } from "react";
import CategoriesForm from "../../Components/Forms/CategoriesForm/CategoriesForm";
import "./CategoriesPage.css";
import CategoriesContext from "../../Context/CategoriesContext/CategoriesContext";
import { getAllCategories } from "../../services/get";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";

function CategoriesPage () {
   const { categories, setCategories, update, setUpdate } = useContext(CategoriesContext);

   useEffect(() => {
     const getCategories = async () => {
       try{
         const categ = await getAllCategories();
         setCategories(categ);
       }catch(error){
         console.error(error.message);
       }
     }
     getCategories();
   }, [update]);

   return (<>
   <div className="row justify-content-md-center">
    <div className="col col-lg-5">
        <CategoriesForm />
    </div>
    <div className="col-lg-2">
        {categories.map((categ, index) => {
            return <CategoryCard key={index} category={categ} setUpdate={setUpdate} />
        })}
    </div>
   </div>
   </>);
}

export default CategoriesPage;