

 const Images=(props)=>{
    return(
        <div className="photo-container">
            {
                props.for_map.map(imageURI =>
                    (
                        <div style={{ textAlign: 'center', width:'50%'}}>
                            <div className="photo-uploaded"  style={{position:'relative' , textAlign: 'center',width: '100%'}}  >
                                <img src={imageURI}  alt="Photo uploaded"  />
                            </div>
                        </div>
                    ))
            }
        </div>
    )
 }

 export default Images;