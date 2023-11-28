import { useState,useRef, useEffect } from "react";
import {db} from "../firebaseInit";
import { collection,deleteDoc,doc,getDocs,onSnapshot,setDoc } from "firebase/firestore"; 

// function blogsReducer(state,action){
//     switch(action.type){
//         case "ADD":
//             return[action.blog,...state];
//         case "REMOVE":
//             return state.filter((blog,index)=>index !==action.index)
//         default:
//             return[];
//     }
// }

export default function Blog(){

    // const [title,setTitle] =useState("");
    // const[content,setContent]=useState("");
    const [formData,setFormData]=useState({title:"",content:""})
    const [blogs,setBlogs]=useState([]);
    // const[blogs,dispatch]=useReducer(blogsReducer,[]);
    const titleRef =useRef(null);

    useEffect(()=>{
        titleRef.current.focus();
    },[]);

    // useEffect(()=>{
    //     if(blogs.length && blogs[0].title){
    //         document.title =blogs[0].title;
    //     }
    //     else{
    //         document.title ="No Blogs!!"
    //     }
    // },[blogs]);

    useEffect(()=>{
       
        // async function fetchData(){
        //     const sanpShot =await getDocs(collection(db,"blogs"));
        //     console.log(sanpShot);

        //     const blogs =sanpShot.docs.map((doc)=>{
        //         return{
        //             id:doc.id,
        //             ...doc.data()
        //         }
        //     })
        //     console.log(blogs);
        //     setBlogs(blogs);
        // }
        //     fetchData();

        const unsub =  onSnapshot(collection(db,"blogs"), (snapShot) => {
            const blogs = snapShot.docs.map((doc) => {
                    return{
                        id: doc.id,
                        ...doc.data()
                    }
                })
                console.log(blogs);
                setBlogs(blogs);
        })
    },[]);
   
    async function handleSubmit(e){
        e.preventDefault();
        titleRef.current.focus();

        //setBlogs([{title: formData.title ,content : formData.content},...blogs]);
          // Add a new document with a generated id.
          //____Another way  we hav to write____________________________________________________
        //    await addDoc(collection(db, "blogs"), {
        //     title: formData.title,
        //     content: formData.content,
        //     createdOn:new Date()
        //____ });_______________________________________________________
        const docRef = doc(collection(db, "blogs"))
        await setDoc(docRef, {
                title: formData.title,
                content: formData.content,
                createdOn:new Date()
             });
         //console.log("Document written with ID: ", docRef.id);
         setFormData({title:" ",content:""})
       }
        // dispatch({type:"ADD",blog:{title: formData.title ,content : formData.content}})
        // titleRef.current.focus();
        // console.log(blogs);

        async function removeBlog(id){
        // setBlogs(blogs.filter((blog,index)=> index !==i));
        // dispatch({type:"REMOVE" ,index: i})
       const docRef =doc (db,"blogs",id);
       await deleteDoc(docRef)
    }

    return(
        <>
        <h1>Write a Blog!</h1>
        <div className="section">
            <form onSubmit={handleSubmit}>
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                ref={titleRef}
                                value={formData.title}
                                onChange={(e)=> setFormData({title: e.target.value, content:formData.content})}
                                />
                </Row >

                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                required
                                value={formData.content}
                                onChange={(e)=>setFormData({title:formData.title , content:e.target.value})}/>
                </Row >

                          
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        <h2> Blogs </h2>
         {blogs.map((blog,i) => (
            <div className="blog" key={i}>
                <h3>{blog.title}</h3>
                <hr/>
                <p>{blog.content}</p>

                <div className="blog-btn">
                    <button onClick={() => {
                        removeBlog(blog.id)
                        }}
                         className="btn remove">

                        Delete

                    </button>
                </div>

            </div>
        ))}
        </>
        )
    }


function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}