function getArgs (args) {
  return args.slice(2).reduce((acc, arg, i, arr) => {
    const key = arg.substring(1);
    switch(key) {
      case 'h':
        return { ...acc, [key]: true };
      case 't':
      case 's':
        if (arr.length - 1 === i) {
          throw new Error(`please specify value for ${arg}`);
        }
        if (arr[i + 1][0] === '-') {
          throw new Error(`please specify value for ${arg}`);
        }
        return { ...acc, [key]: arr[i + 1] }; 
      default:
        return acc;
    }
  }, {});
};

export { getArgs };