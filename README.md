# DeepBlue-Ex-TKPM
## Hướng dẫn sử dụng **Version 5.0**
### Cấu trúc source code
```
Mô hình sử dụng: Mô hình MVC

DeepBlue-Ex-TKPM/
├── backend/             - Thư mục chứa mã nguồn backend
│   ├── src/             - Chứa các tệp mã nguồn cho backend
│   │   ├── config/      - Các tệp cấu hình cho ứng dụng backend
│   │   ├── controllers/ - Chứa các controller, nơi viết logic cho backend API
│   │   ├── models/      - Chứa các model, định nghĩa cấu trúc dữ liệu
│   │   ├── routes/      - Cài đặt các route cho chương trình
│   │   ├── seeders/     - Dữ liệu mẫu dùng để khởi tạo cơ sở dữ liệu
│   │   ├── services/    - Chứa các dịch vụ xử lý công việc với cơ sở dữ liệu MongoDB
│   │   ├── views/       - Các tệp giao diện ứng dụng
│   │   └── server.js    - File chính để khởi động server backend
│   ├── .env             - Chứa các biến môi trường, thông tin bảo mật
│   ├── .env.example     - File mẫu .env giúp cấu hình dễ dàng hơn
│   ├── package-lock.json - Tệp khóa các phiên bản của các gói phụ thuộc
│   ├── package.json     - Tệp cấu hình npm cho backend
│   └── README.md        - Tài liệu hướng dẫn sử dụng cho phần backend
├── frontend/            - Thư mục chứa mã nguồn frontend
│   ├── public/          - Thư mục chứa các tệp tĩnh như favicon, index.html
│   ├── src/             - Chứa mã nguồn ứng dụng React
│   │   ├── assets/      - Các tài nguyên
│   │   ├── pages/       - Các trang của ứng dụng
│   │   ├── services/    - Các dịch vụ liên kết frontend với backend API
│   │   ├── tests/       - Các tệp kiểm thử
│   │   ├── App.jsx      - Component chính của ứng dụng React
│   │   └── main.jsx     - Entry point của ứng dụng React
│   ├── index.html       - Tệp HTML chính cho ứng dụng React
│   ├── setupTests.js    - Cấu hình môi trường kiểm thử
│   ├── vite.config.js   - Cấu hình của Vite
│   ├── package-lock.json - Tệp khóa các phiên bản của các gói phụ thuộc cho frontend
│   ├── package.json     - Tệp cấu hình npm cho frontend
│   └── README.md        - Tài liệu hướng dẫn sử dụng cho phần frontend
├── .gitignore           - Các tệp và thư mục cần loại bỏ khỏi Git
└── README.md            - Tài liệu hướng dẫn chung cho toàn bộ dự án
```

### Hướng dẫn cài đặt & chạy chương trình
#### 1. Cài đặt và chạy Backend (BE)
- Mở terminal và chạy lệnh `npm install` để cài đặt tất cả các package từ package.json:
```
npm install
```
- Sau khi tải xong, dùng lệnh `npm start` để chạy chương trình:
```
npm start
```
- Backend sẽ được host local tại port theo cài đặt trong file .env, ví dụ:
```
http://localhost:5134
```
#### 2. Chạy test cho Backend
- Mở một terminal mới và di chuyển vào thư mục frontend, sau đó cài đặt các package cho backend:
```
cd backend
npm install
```
- Chạy lệnh `npm test` để chạy các unit test cho backend:
```
npm test
```


#### 3. Cài đặt và chạy Frontend (FE)
- Mở một terminal mới và di chuyển vào thư mục frontend, sau đó cài đặt các package cho frontend:
```
cd frontend
npm install
```
- Sau khi cài xong, dùng lệnh sau để chạy chương trình frontend:
```
npm run dev
```
- Frontend sẽ được host tại http://localhost:5173. Truy cập trang tại:
```
http://localhost:5173
```
#### 4. Chạy test cho Frontend
- Mở một terminal mới và di chuyển vào thư mục frontend, sau đó cài đặt các package cho frontend:
```
cd frontend
npm install
```
- Chạy lệnh `npx vitest run` để chạy các unit test cho frontend:
```
npx vitest run
```

### Biên dịch (tùy theo ngôn ngữ sử dụng)
- Sử dụng lệnh `npm install` và `npm start` cho backend, lệnh `npm install` và `npm run dev` cho frontend, ngoài ra không cần biên dịch gì thêm.

### Chạy chương trình
- Chạy chương trình bằng các lệnh trong hướng dẫn sử dụng trong terminal.
- Truy cập trang web tại: http://localhost:5173

### Các tính năng đã làm được
- Xuất bảng điểm cho sinh viên (Gặp phải lỗi font Tiếng Việt).
- Thêm sinh viên bằng file CSV.
