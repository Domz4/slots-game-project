const isDefined = (width: number, height: number) => width !== undefined && height !== undefined;

export const getScreenSize = () => {
  const { width, height } = window.screen;

  return isDefined(width, height)
    ? { width: window.innerWidth, height: window.innerHeight }
    : undefined;
};
