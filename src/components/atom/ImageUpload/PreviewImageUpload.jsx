/** @format */

import React, { useState, useRef, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
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

function PreviewImageUpload({ defaultImgUrl = null, setValue, aspectRatio = 1, disabled = false }) {
	const [file, setFile] = useState(null);
	const [originalImgUrl, setOriginalImgUrl] = useState(defaultImgUrl);
	const [imageUrl, setImageUrl] = useState(null);
	const [crop, setCrop] = useState({ unit: '%', width: 50, height: 50, x: 25, y: 25 });
	const [completedCrop, setCompletedCrop] = useState(null);
	const [croppedImageUrl, setCroppedImageUrl] = useState(null);
	const previewCanvasRef = useRef(null);
	const [aspect, setAspect] = useState(aspectRatio);
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
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setOriginalImgUrl(defaultImgUrl);
		setImageUrl(defaultImgUrl);
		setCroppedImageUrl(defaultImgUrl);
		setImage(defaultImgUrl);
		setAspect(aspectRatio);
	}, [defaultImgUrl, aspectRatio]);

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
		e.target.value = null;
	};

	const resetImage = () => {
		setFile(null);
		setImageUrl(null);

		if (originalImgUrl) {
			setCroppedImageUrl(originalImgUrl);
		} else if (defaultImgUrl) {
			setCroppedImageUrl(defaultImgUrl);
		} else {
			setCroppedImageUrl(null);
		}
	};

	const initCompleteCrop = (width = 200, height = 200) => {
		setAspect(aspectRatio);
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
		setLoading(true);

		if (!previewCanvasRef.current) {
			setLoading(false);
			throw new Error('Crop canvas does not exist');
		}

		previewCanvasRef.current.toBlob(async (blob) => {
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

			//Image compression
			const options = {
				maxSizeMB: 0.1,
				maxWidthOrHeight: 800,
				useWebWorker: true,
				initialQuality: 0.8,
			};

			try {
				const compressedFile = await imageCompression(blob, options);
				console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
				console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
				setValue(compressedFile);
				setCropImageModal(false);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setCropImageModal(false);
				setLoading(false);
			}
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
			<Button component='label' sx={{ p: 0 }} className='w-[180px] bg-black'>
				<div
					className={`flex py-2 rounded-lg ${
						croppedImageUrl ? '' : 'border border-gray-400 border-dashed'
					} justify-start text-center items-center w-full h-auto`}
					style={{ backgroundColor: croppedImageUrl ? 'white' : '#FCFCFD' }}>
					{croppedImageUrl ? (
						<div className='border p-1 rounded-lg border-gray-400'>
							<img
								ref={imgPreviewRef}
								src={croppedImageUrl}
								alt='Cropped Image'
								style={{ maxWidth: '180px', borderRadius: 4 }}
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
				{!disabled ? (
					<input hidden onChange={handleFileUpload} id='uploadfile' name='file' type='File' />
				) : null}
			</Button>

			<ModalProvider2
				loading={loading}
				loadingTitle='Processing image, please wait.. '
				isOpen={cropImageModal}
				handleClose={() => {
					if (!loading) {
						setCropImageModal(false);
					}
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
						}}>
						Crop & Save
					</ButtonProvider>
				</div>
			</ModalProvider2>
		</>
	);
}

export default PreviewImageUpload;
