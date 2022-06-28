import React, {useState} from 'react';

const File = (props) => {

    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
        const formData = new FormData();

        formData.append('file', selectedFile);

        console.log( "formData", formData, "asd", selectedFile );

        fetch(
            'http://dev.pruebas.com/index2.php',
            {
                method: 'POST',
                body: formData,
            }
        )
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
			let url_imagen = `http://dev.pruebas.com/uploads/${selectedFile.name}`;
			console.log( url_imagen );
			props.setImagen( selectedFile.name );
        })
        .catch((error) => {
            console.error('Error:', error);
        });
	};

	return(
        <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}


export default File