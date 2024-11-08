const {
	addArtworksService,
	getArtworksService,
	getArtworksByIdService,
	updateArtworksService,
	deleteArtworksService,
} = require("../services/artService");
const imagekit = require("../libs/imagekit");

const uploadArt = async (req, res, next) => {
	try {
		let { title, description } = req.body;

		if (!title || !description || !req.file) {
			const error = new Error(
				"Failed To Upload The Art, Make Sure To fill all Form!!!"
			);
			error.statusCode = 400;
			throw error;
		}

		const stringFile = req.file.buffer.toString("base64");
		const uploadImage = await imagekit.upload({
			fileName: title,
			file: stringFile,
		});

		// console.log("-> uploadImage: " ,req.params.artId);
		if (uploadImage) {
			const art = {
				title: title,
				description: description,
				imageUrl: uploadImage.url,
				imageFieldId: uploadImage.fileId,
			};

			const uploadservice = await addArtworksService(art);

			return res.status(201).json({
				status: "Success",
				message: "Art upload was successful",
				data: uploadservice,
			});
		}
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
			error.message = "There's Something Wrong with The Server!";
		}

		next(error);
	}
};

const getArt = async (req, res, next) => {
	try {
		const art = await getArtworksService();

		res.status(200).json({
			status: "Success",
			message: "Successfuly Retrieved All Arts",
			data: art,
		});
	} catch (error) {
		next(error);
	}
};

const getArtById = async (req, res, next) => {
	try {
		const art = await getArtworksByIdService(req.params.artId);

		if (!art) {
			const error = new Error("There's no Such Art!");
			error.statusCode = 400;
			throw error;
		}

		res.status(200).json({
			status: "Success",
			message: "Successfuly Retrieved The Art",
			data: art,
		});
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
			error.message = "There's Something Wrong with The Server!";
		}

		next(error);
	}
};

const updateArt = async (req, res, next) => {
	try {
		if (!req.body || !req.file) {
			const error = new Error(
				"Failed To Upload The Art, Make Sure To at least fill one Form!!!"
			);
			error.statusCode = 400;
			throw error;
		}

		// console.log("-> id: " ,req.params.artId);
		// console.log("-> body: " ,body);
		// console.log("-> file: " ,file);
		const art = await updateArtworksService(
			req.params.artId,
			req.body,
			req.file
		);

		if (!art) {
			const error = new Error("There's no Such Art!");
			error.statusCode = 400;
			throw error;
		}

		res.status(200).json({
			status: "Success",
			message: "Successfuly Update The Art!",
			data: art,
		});
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
			error.message = "There's Something Wrong with The Server!";
		}

		next(error);
	}
};

const deleteArt = async (req, res, next) => {
	try {
		const art = await deleteArtworksService(req.params.artId);

		if (!art) {
			const error = new Error("There's no Such Art!");
			error.statusCode = 400;
			throw error;
		}

		res.status(200).json({
			status: "Success",
			message: "Successfuly Delete The Art!",
		});
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
			error.message = "There's Something Wrong with The Server!";
		}

		next(error);
	}
};

module.exports = { uploadArt, getArt, getArtById, updateArt, deleteArt };
