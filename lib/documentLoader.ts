const axios = require("axios");
const vc = require("@digitalcredentials/vc");

const testContext = require("../resources/contexts/index");

const documentLoader = async (url: string) => {
  console.log("OH YES");
  console.log(url);

  const context = testContext.get(url);
  if (context) {
    return {
      contextUrl: null,
      documentUrl: url,
      document: context,
    };
  }

  if (url && (url.startsWith("https:") || url.startsWith("http:"))) {
    const { data: document } = await axios.get(url);
    const result = {
      contextUrl: null,
      document,
      documentUrl: url,
    };
    return result;
  }

  console.log("OH NO");
  console.log(url);

  return vc.defaultDocumentLoader(url);
};

export default documentLoader;
