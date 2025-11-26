export async function compressVideo(file) {
  const ffmpeg = await getFFmpeg();

  ffmpeg.FS("writeFile", file.name, await ffmpeg.fetchFile(file));
  const outputName = `compressed_${file.name}`;

  await ffmpeg.run(
    "-i",
    file.name,
    "-vf",
    "scale=-2:720",
    "-b:v",
    "1M",
    "-preset",
    "fast",
    outputName
  );

  const data = ffmpeg.FS("readFile", outputName);
  return new File([data.buffer], file.name, { type: "video/mp4" });
}
