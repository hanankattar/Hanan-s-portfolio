/* ============================================================
   IMAGE HELPERS
   ------------------------------------------------------------
   Two jobs:
   1. resizeImageFile — shrinks/compresses an uploaded photo
      before it's stored, so a handful of normal phone photos
      don't blow past the browser's storage limit.
   2. normalizeImageUrl — turns a pasted Google Drive (or
      Dropbox) SHARE link into a direct-viewable image link.
      A normal Drive "share" link opens a preview page, not the
      raw image — <img> tags can't use it directly. This
      converts it automatically so you can just paste the
      share link as-is.
   ============================================================ */

function resizeImageFile(file, maxDim, quality){
  maxDim = maxDim || 1400;
  quality = quality || 0.82;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim){
          if (width >= height){
            height = Math.round(height * (maxDim / width));
            width = maxDim;
          } else {
            width = Math.round(width * (maxDim / height));
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Could not read that image file.'));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.readAsDataURL(file);
  });
}

function normalizeImageUrl(url){
  if (!url) return url;
  url = url.trim();
  if (!url) return url;

  if (url.includes('drive.google.com')){
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    const id = fileMatch ? fileMatch[1] : (idMatch ? idMatch[1] : null);
    if (id){
      return `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
    }
  }

  if (url.includes('dropbox.com') && url.includes('dl=0')){
    return url.replace('dl=0', 'raw=1');
  }

  return url;
}

function isQuotaError(err){
  return err && (
    err.name === 'QuotaExceededError' ||
    err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
    (typeof err.code !== 'undefined' && err.code === 22)
  );
}
