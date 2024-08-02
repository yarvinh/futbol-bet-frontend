const compressImages = (files,name,imagesRef) =>{
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }

    const formData = new FormData(); 
    Array.from(files).forEach(async (file)=>{   
        const compressedFile = await imageCompression(file, options);      
        formData.append("file[]", compressedFile);  
    })

    imagesRef.current = {
        ...imagesRef.current,
        [name]: formData,
    }
}

const getImg = (files) => {

}