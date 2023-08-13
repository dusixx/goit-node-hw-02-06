import fs from 'fs/promises';
import path from 'path';

const { isAbsolute: isAbs, resolve, join } = path;

export const moveFile = async (from, to) => {
  const src = !isAbs(from) ? resolve(from) : from;
  const dst = !isAbs(to) ? resolve(to) : to;

  await fs.rename(src, dst);

  // [абсолютный dst, относительный dst]
  return [dst, dst.replace(`${path.resolve()}\\`, '')];
};

// path - часть пути dst, НЕ указанная в express.static()
export const moveAvatar = async (
  fileName,
  { src = 'tmp', dst = 'public/avatars', path = 'avatars', newFileName } = {}
) => {
  try {
    let [, url] = await moveFile(
      join(src, fileName),
      join(dst, newFileName || fileName)
    );
    url = path ? join(path, newFileName || fileName) : url;
    return url.replace(/\\/g, '/');
  } catch {
    return null;
  }
};
