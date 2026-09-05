export const metadata = {
  title: '미래공학 학급 홈페이지',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
