import fs from 'fs/promises';

export const removeAvatar = async ({ file }) => {
  //   console.log(file);
  if (file) await fs.unlink(file.newPath || file.path);
};
