const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imagekit = require("../libs/imagekit");

const addArtworksService = async (data) => {
	try {
		let { title, description, imageUrl, imageFieldId } = data;

		const newArt = await prisma.art_images.create({
			data: {
				title,
				description,
				imageUrl,
				imageFieldId,
			},
		});

		return newArt;
	} catch (error) {
		console.log(error);
	}
};

const getArtworksService = async () => {
	try {
		const arts = await prisma.art_images.findMany({
			select: {
				id: true,
				title: true,
				description: true,
			},
		});

		return arts;
	} catch (error) {
		console.log(error);
	}
};

const getArtworksByIdService = async (id) => {
	try {
		const art = await prisma.art_images.findUnique({
			where: { id: parseInt(id) },
		});

		return art;
	} catch (error) {}
};

const updateArtworksService = async (id, data, file) => {
	try {
		let updatedData = {};

		if (data.title) {
			updatedData.title = data.title;
			// console.log("-> at Title: ",updatedData);
		}
		if (data.description) {
			updatedData.description = data.description;
			// console.log("-> at Description: ",updatedData);
		}
		if (file) {
			// console.log("-> at file: ",updatedData);
			const stringFile = file.buffer.toString("base64");
			const uploadImage = await imagekit.upload({
				fileName: data.title,
				file: stringFile,
			});

			updatedData.imageUrl = uploadImage.url;
			updatedData.imageFieldId = uploadImage.fileId;
			// console.log("-> at file part 2: ",updatedData);
		}

		console.log(updatedData);

		const updateArt = await prisma.art_images.update({
			where: { id: parseInt(id) },
			data: updatedData,
		});

		return updateArt;
	} catch (error) {
		console.log(error);
	}
};

const deleteArtworksService = async (id) => {
	try {
		const art = await prisma.art_images.delete({
			where: { id: parseInt(id) },
		});

		return art;
	} catch (error) {}
};

module.exports = {
	addArtworksService,
	getArtworksService,
	getArtworksByIdService,
	updateArtworksService,
	deleteArtworksService,
};
