const toBase64DataUri = (file: Express.Multer.File) => {
  const base64 = file.buffer.toString("base64");
  return `data:${file.mimetype};base64,${base64}`;
};

export default toBase64DataUri;
