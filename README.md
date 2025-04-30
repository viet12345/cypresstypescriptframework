# Cypress TypeScript Framework

This is a lightweight and modular **Cypress E2E Testing Framework** using **TypeScript**, intended for scalable test automation projects.

---

## 🧰 Prerequisites

Make sure the following are installed on your system:

- [Node.js (>= 16.x)](https://nodejs.org/)
- [Yarn (>= 1.22)](https://classic.yarnpkg.com/)
- [Git](https://git-scm.com/)

You can verify installations with:

```bash
node -v
yarn -v
git --version
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/goldenriver1592/cypresstypescriptframework.git
cd cypresstypescriptframework
```

### 2. Install Dependencies

```bash
yarn install
```

This installs all required packages using Yarn.

---

## 📂 Project Structure

```
cypress/
├── downloads/                             # 📥 Lưu các file được tải về trong quá trình test
├── fixtures/
│   ├── urls.ts                            # 🌐 Danh sách các URL phục vụ test
│   └── users.ts                           # 👤 Danh sách thông tin user test (username, password,...)
├── reports/
│   ├── allure-report/                     # 📊 Báo cáo Allure HTML đã generate
│   ├── allure-results/                    # 🧾 Kết quả raw JSON do plugin Allure sinh ra
│   └── screenshots/                       # 📸 Ảnh chụp màn hình khi test thất bại
├── support/
│   ├── commands/
│   │   ├── globalCommands.ts              # 🛠 Các lệnh `cy.` dùng toàn cục, ví dụ `cy.verifyUrl()`
│   │   └── pageCommands/
│   │       └── signInPageCommands.ts      # 🔧 Lệnh liên quan riêng đến trang đăng nhập (SignIn)
│   ├── components/
│   │   ├── ModalDialog.ts                 # 💬 Xử lý modal dialog (có thể kế thừa BasePage nếu có tương tác)
│   │   └── Table.ts                       # 📊 Component bảng, chứa logic tương tác với bảng (sort, filter,...)
│   ├── constants/
│   │   ├── signInPageConstants.ts         # 🎯 Các constants riêng cho SignInPage
│   │   └── myAccountPageConstants.ts      # 🎯 Các constants riêng cho MyAccountPage
│   ├── pages/
│   │   ├── BasePage.ts                    # 🧱 Lớp cơ sở cho tất cả page, chứa các hành động như get, click, visit
│   │   ├── SignInPage.ts                  # 📘 Class đại diện cho trang đăng nhập, kế thừa BasePage
│   │   └── index.page.ts                  # 📦 Import tập trung các page để dùng trong test hoặc command
│   ├── utils/
│   │   ├── dateHelper.ts                  # 🕓 Hàm hỗ trợ xử lý ngày tháng
│   │   ├── path.ts                        # 📁 Hàm xử lý đường dẫn, join path, build URL
│   │   └── ...
│   ├── commands.ts                        # 📥 Import tất cả các command nhỏ trong folder commands vào đây để load 1 lần
│   ├── commands.d.ts                      # 📌 Định nghĩa TypeScript cho custom command (giúp gợi ý cy.xyz)
│   └── e2e.ts                             # 🚀 Entry point khởi chạy test: load pages, commands,...


---

## 🧪 Running Tests

### Launch Cypress Test Runner (GUI)

```bash
yarn run cypress open
```

This opens the Cypress test runner for interactive debugging.

### Run Tests in Headless Mode (CI-friendly)

```bash
yarn run cypress run
```

This executes all tests via the terminal without UI.

---

## 🔧 Customization

Add shared logic or commands in:

- `cypress/support/commands.ts`
- `cypress/support/e2e.ts`

These files are auto-loaded before test files.

---

## 📜 Yarn Scripts

You can use these handy shortcuts:

```json
"scripts": {
  "test:allure": "yarn prereport && yarn test || echo '⚠️ Test failed' && yarn allure:generate && yarn allure:open"
}
```

Run with:

```bash
yarn run test:allure
```

---

## 🔄 How to Handle `yarn.lock` Conflicts

When working with multiple branches, it’s common that `yarn.lock` may be modified in different features. This can cause merge conflicts or inconsistent dependency trees.

### ✅ Best Practices

1. **Always commit `yarn.lock`** together with `package.json` whenever dependencies change.
2. **Do NOT manually resolve `yarn.lock` conflicts** line by line.

### 🛠 If you encounter a merge conflict in `yarn.lock`:

```bash
# Step 1: Choose which version to keep (ours or theirs)
git checkout --ours yarn.lock   # or --theirs, based on your needs

# Step 2: Reinstall dependencies to regenerate a clean lockfile
yarn install

# Step 3: Re-test your app to ensure dependencies are correct
# Step 4: Commit the fixed yarn.lock
git add yarn.lock
git commit -m "Fix yarn.lock after merge"


---


## 💡 Tips

- Use [Cypress Studio](https://docs.cypress.io/guides/core-concepts/using-cypress-studio) to generate test steps visually.
- Extend with [Allure](https://docs.qameta.io/allure/) or [Mochawesome](https://github.com/adamgruber/mochawesome) for advanced reporting.

---

## 🤝 Contributing

Feel free to fork, open issues, or submit pull requests to improve the framework.

---

## 📄 License

[MIT](https://opensource.org/licenses/MIT)