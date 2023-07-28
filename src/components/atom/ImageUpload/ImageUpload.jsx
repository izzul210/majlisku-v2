/** @format */

import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextProvider from '../TextProvider/TextProvider';
import { ImageUploadIcon } from '../../icons/actionIcons';
import ReactCrop, { centerCrop, makeAspectCrop, convertToPixelCrop } from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';
import './ImageUpload.css';
import ModalProvider2 from '../ModalProvider/ModalProvider3';
import ButtonProvider from '../ButtonProvider/ButtonProvider';
import { useDebounceEffect } from './useDebounceEffect';
import { canvasPreview } from './canvasPreview';

function ImageUpload({ defaultImgUrl = null, dispatch = () => {}, type = 'SET_IMAGE' }) {
	const [file, setFile] = useState(null);
	const [originalImgUrl, setOriginalImgUrl] = useState(defaultImgUrl);
	const [imageUrl, setImageUrl] = useState(null);
	const [crop, setCrop] = useState({ unit: '%', width: 50, height: 50, x: 25, y: 25 });
	const [completedCrop, setCompletedCrop] = useState(null);
	const [croppedImageUrl, setCroppedImageUrl] = useState(null);
	const previewCanvasRef = useRef(null);
	const [aspect, setAspect] = useState(1);
	const [scale, setScale] = useState(1);
	const [rotate, setRotate] = useState(0);
	/////
	const [image, setImage] = useState(null);
	const [output, setOutput] = useState(null);
	//Refs
	const blobUrlRef = useRef('');
	const imgRef = useRef(null);
	const imgPreviewRef = useRef(null);
	//Modal states
	const [cropImageModal, setCropImageModal] = useState(false);
	const [editImageModal, setEditImageModal] = useState(false);

	useEffect(() => {
		setOriginalImgUrl(defaultImgUrl);
		setImageUrl(defaultImgUrl);
		setCroppedImageUrl(defaultImgUrl);
		setImage(defaultImgUrl);
	}, [defaultImgUrl]);

	function formatBytes(bytes, decimals) {
		if (bytes == 0) return '0 Bytes';
		var k = 1024,
			dm = decimals || 2,
			sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
			i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
		const cropParams = makeAspectCrop(
			{
				unit: '%',
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight
		);

		return centerCrop(cropParams, mediaWidth, mediaHeight);
	}

	const handleFileUpload = (e) => {
		let selected = e.target.files[0];

		console.log('selected', selected);

		if (selected) {
			setFile(selected);
			const fileUrl = URL.createObjectURL(selected);
			setImageUrl(fileUrl);
			setCropImageModal(true);
			initCompleteCrop();
		} else {
			resetImage();
		}

		// Reset the value of the input element to clear the selected file
		event.target.value = null;
	};

	const resetImage = () => {
		setFile(null);
		setImageUrl(null);

		console.log('originalImgUrl', originalImgUrl);

		if (originalImgUrl) {
			setCroppedImageUrl(originalImgUrl);
		} else if (defaultImgUrl) {
			setCroppedImageUrl(defaultImgUrl);
		} else {
			setCroppedImageUrl(null);
		}
	};

	const initCompleteCrop = (width = 200, height = 200) => {
		setAspect(1);
		const newCrop = centerAspectCrop(width, height, 1);
		setCrop(newCrop);

		const cropObject = {
			width: width,
			height: height,
			x: 0,
			y: 0,
			unit: 'px',
		};
		setCrop(cropObject);
		// Updates the preview
		setCompletedCrop(convertToPixelCrop(cropObject));
	};

	const handleCancelCrop = () => {
		resetImage();
		setCropImageModal(false);
	};

	function onCropSave() {
		if (!previewCanvasRef.current) {
			throw new Error('Crop canvas does not exist');
		}

		previewCanvasRef.current.toBlob((blob) => {
			if (!blob) {
				throw new Error('Failed to create blob');
			}
			if (blobUrlRef.current) {
				URL.revokeObjectURL(blobUrlRef.current);
			}

			blobUrlRef.current = URL.createObjectURL(blob);
			// console.log('blobUrlRef.current', blobUrlRef.current);
			setCroppedImageUrl(blobUrlRef.current);
			setOriginalImgUrl(URL.createObjectURL(file));
			dispatch(type, blobUrlRef.current);
		});
	}

	function onImageLoad(e) {
		if (aspect) {
			const { width, height } = e.currentTarget;
			setCrop(centerAspectCrop(width, height, aspect));
		}
	}

	useDebounceEffect(
		async () => {
			if (
				completedCrop?.width &&
				completedCrop?.height &&
				imgRef.current &&
				previewCanvasRef.current
			) {
				// We use canvasPreview as it's much faster than imgPreview.
				canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
			}
		},
		100,
		[completedCrop, scale, rotate]
	);

	return (
		<>
			<Button component='label' sx={{ p: 0 }} className='w-full bg-black'>
				<div
					className={`flex py-2 rounded-lg ${
						croppedImageUrl ? '' : 'border border-gray-400 border-dashed'
					} justify-center  items-center w-full h-auto`}
					style={{ backgroundColor: croppedImageUrl ? 'white' : '#FCFCFD' }}>
					{croppedImageUrl ? (
						<div className='border p-1 rounded-lg border-gray-400'>
							<img
								ref={imgPreviewRef}
								src={croppedImageUrl}
								alt='Cropped Image'
								style={{ maxWidth: '280px', borderRadius: 4 }}
							/>
						</div>
					) : (
						<div className='flex flex-col gap-0 p-3 justify-center items-center normal-case'>
							<div className='my-2'>
								<ImageUploadIcon />
							</div>
							<TextProvider>Upload Photo</TextProvider>
							<TextProvider>SVG, PNG, JPG or GIF (max. 5mb)</TextProvider>
						</div>
					)}
				</div>
				<input hidden onChange={handleFileUpload} id='uploadfile' name='file' type='File' />
			</Button>

			<ModalProvider2
				isOpen={cropImageModal}
				handleClose={() => {
					setCropImageModal(false);
				}}
				title='Crop Image'>
				<div className='flex flex-col p-2 gap-4 justify-center items-center'>
					{imageUrl ? (
						<>
							<ReactCrop
								crop={crop}
								onCropChange={setCrop}
								onChange={(_, percentCrop) => setCrop(percentCrop)}
								onComplete={(c) => {
									setCompletedCrop(c);
								}}
								aspect={aspect}>
								<img
									ref={imgRef}
									src={imageUrl}
									alt='Uploaded Image'
									onLoad={onImageLoad}
									style={{ maxWidth: '275px', borderRadius: '5px', border: '2px solid gray' }}
								/>
							</ReactCrop>
						</>
					) : null}
					{completedCrop && (
						<div className='w-full'>
							<TextProvider className='font-semibold uppercase text-base mb-1'>
								Preview
							</TextProvider>
							<div className='w-full border-t border-gray-400 py-3 flex justify-center'>
								<canvas
									ref={previewCanvasRef}
									style={{
										border: '1px solid black',
										objectFit: 'contain',
										width: completedCrop.width,
										height: completedCrop.height,
									}}
								/>
							</div>
						</div>
					)}
				</div>
				<div className='flex w-full justify-end gap-2 mt-6 p-2 border border-t'>
					<ButtonProvider width='120px' className='uppercase' onClick={handleCancelCrop}>
						Cancel
					</ButtonProvider>
					<ButtonProvider
						width='120px'
						type='primary'
						className='uppercase'
						onClick={() => {
							onCropSave();
							setCropImageModal(false);
						}}>
						Crop & Save
					</ButtonProvider>
				</div>
			</ModalProvider2>
		</>
	);
}

export default ImageUpload;
