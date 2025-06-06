# 🚀 Hướng dẫn Release Extension

Tài liệu này hướng dẫn quy trình tăng version, commit và kích hoạt build + release tự động bằng GitHub Actions cho extension `youtube-tweaks`.

---

## 🔢 Bước 1: Tăng version trong `package.json`

Sử dụng một trong các lệnh sau để tăng version:

| Loại cập nhật      | Lệnh                    | Ví dụ kết quả |
| ------------------ | ----------------------- | ------------- |
| Bản vá (bugfix)    | `npm run version:patch` | 1.2.4 → 1.2.5 |
| Bản nhỏ (feature)  | `npm run version:minor` | 1.2.4 → 1.3.0 |
| Bản lớn (breaking) | `npm run version:major` | 1.2.4 → 2.0.0 |

Ví dụ:

```bash
npm run version:patch
```

📌 Lệnh trên chỉ cập nhật package.json, KHÔNG commit hoặc tag.

## ✅ Bước 2: Commit và đẩy lên main

### Cách 1:

Chạy lệnh sau để commit với đúng version vừa cập nhật:

```bash git add .
git commit -m "Release v$(node -p "require('./package.json').version")"
git push origin main
```

Kết quả:

- Tạo commit như Release v1.2.5
- Push lên main, kích hoạt workflow CI/CD

#### Cách 2

```bash git add .
npm run release:patch:commit
```

###### Tương tự như cách 1 nhưng ngắn hơn
