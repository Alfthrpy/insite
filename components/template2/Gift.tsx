export default function Gift() {
  return (
    <div
      className="bg-[#F6F1EB] flex flex-col items-center py-14"
      style={{
        backgroundImage:
          "url('https://assets.satumomen.com/images/posts/foto-prewedding-outdoor-alam-4-1686107469.jpg')",
      }}
    >
      <div className="">
        {/* Header */}
        <div className="p-6 border-b border-[#C1A15A]">
          <h1 className="text-3xl  text-center font-bold tracking-wide font-sans text-gray-800">
            SENDING GIFT
          </h1>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-center items-center gap-8">
          <p className="text-lg text-center text-[#5A4636] mb-4">
            Transfer directly to the account below:
          </p>
          <ul className="space-y-8 text-center">
            <li>
              <p className="text-base text-[#5A4636]">
                <span className="font-bold">Bank Mandiri</span>
              </p>
              <p className="text-xl font-mono font-bold text-[#C1A15A]">18181818718</p>
              <p className="text-[#5A4636]">A/N Our Wedding Link</p>
            </li>
            <li>
              <p className="text-base text-[#5A4636]">
                <span className="font-bold">Bank Central Asia (BCA)</span>
              </p>
              <p className="text-xl font-mono font-bold text-[#C1A15A]">28031280318</p>
              <p className="text-[#5A4636]">A/N Our Wedding Link</p>
            </li>
            <li>
              <p className="text-base text-[#5A4636]">
                <span className="font-bold">Bank Central Asia (BCA)</span>
              </p>
              <p className="text-xl font-mono font-bold text-[#C1A15A]">1234567812</p>
              <p className="text-[#5A4636]">A/N Our Wedding</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
