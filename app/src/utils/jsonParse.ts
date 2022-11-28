const JSONParse = (value: string): any => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export default JSONParse;
