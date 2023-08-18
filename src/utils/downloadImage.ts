    import axios from "axios";

    export async function downloadImage(url: string, filename: string) {
      try {
        const response = await axios.get(url, {
          responseType: "arraybuffer",
        });

        const imageBlob = new Blob([response.data], { type: "image/jpeg" });

        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(imageBlob);
        downloadLink.download = filename;

        downloadLink.click();

        URL.revokeObjectURL(downloadLink.href);
      } catch (error) {
        console.error("There was an error while downloading the image: ", error);
      }
    }
