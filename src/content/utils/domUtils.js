// Thêm style vào head nếu chưa tồn tại
export function addStyle(id, cssContent) {
  if (document.getElementById(id)) return;

  const style = document.createElement("style");
  style.id = id;
  style.textContent = cssContent;
  document.head.appendChild(style);
}

// Xoá style khỏi head
export function removeStyle(id) {
  const styleElement = document.getElementById(id);
  if (styleElement) {
    styleElement.remove();
  }
}

// Tạo hàm quan sát thay đổi DOM
export function observeDOMChange(selector, callback) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (document.querySelector(selector)) {
        callback();
      }
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  if (document.querySelector(selector)) {
    callback();
  }
}

export function queryElement(selector, options = {}) {
  const {
    logError = true,
    returnNull = false,
    containerName = selector,
  } = options;

  const element = document.querySelector(selector);

  if (!element) {
    if (logError) {
      console.error(`Could not find: ${containerName}`);
    }
    return returnNull ? null : undefined;
  }

  return element;
}
