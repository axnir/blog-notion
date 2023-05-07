import probeImageSize from 'probe-image-size';

export const getImageSize = async (
  url: string
): Promise<{ width?: number; height?: number }> => {
  try {
    const result = await probeImageSize(url);
    return {
      height: result.height,
      width: result.width,
    };
  } catch (e) {
    return {};
  }
};
