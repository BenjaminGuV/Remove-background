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
			<div className="grid grid-cols-1 p-8">
				<div className='col-span-12 my-2'>
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="file_input">Upload file</label>
					<input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file" type="file" name="file" onChange={changeHandler} />
					<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
				</div>
				<div className='col-span-12 my-2'>
					<button className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' onClick={handleSubmission}>Submit</button>
				</div>
				<div className='col-span-12 my-2'>
					{isSelected ? (
						<div>
							<div className="flex justify-center">
								<div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
									<div className="py-3 px-6 border-b border-gray-300">
										Image
									</div>
									<div className="p-6">
										<p className="text-gray-700 text-base mb-4" >Filename: {selectedFile.name}</p>
										<p className="text-gray-700 text-base mb-4" >Filetype: {selectedFile.type}</p>
										<p className="text-gray-700 text-base mb-4" >Size in bytes: {selectedFile.size}</p>
										<p className="text-gray-700 text-base mb-4" >
											lastModifiedDate:{' '}
											{selectedFile.lastModifiedDate.toLocaleDateString()}
										</p>
									</div>
								</div>
							</div>
							
						</div>
					) : (
						<p>Select a file to show details</p>
					)}
				</div>
			</div>
		</div>
	)
}


export default File