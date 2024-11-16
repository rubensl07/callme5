import { useNavigate } from 'react-router-dom';
import imgGallery from '../importsGallery.json'


export default ({noText})=>{
    const navigate = useNavigate();
    let srcImg = imgGallery.logoText.src
    let altImg = imgGallery.logoText.alt
    if(noText){
        srcImg = imgGallery.logo.src
        altImg = imgGallery.logo.alt
    }
    return(
        <img style={{cursor:"pointer"}} onClick={()=>navigate('/perfil')} src={srcImg} alt={altImg} />
    )
}