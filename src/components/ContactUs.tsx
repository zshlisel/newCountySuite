
interface Props {
    onClose: () => void;
}

export default function ContactUs({ onClose }: Props) {
    //   const [guestName, setGuestName] = useState('');
    //   const [guestEmail, setGuestEmail] = useState('');
    //   const [guestPhone, setGuestPhone] = useState('');


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-8">Let's talk...</h2>


                {/*   <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>*/}

                <div className="flex flex-col justify-center ">

                    <button
                        type="button"
                        onClick={() => window.location.href = 'mailto:newcountysuite@gmail.com'}
                        className="px-4 py-2 my-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        aria-label="Send an email to newcountysuite@gmail.com"
                    >
                        Email Us
                    </button>
                    <button
                        type="button"
                        onClick={() => window.location.href = 'tel:8452130082'}
                        className="px-4 py-2 my-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        aria-label="Call 8452130082"
                    >
                        Call Us
                    </button>
                    <details>
                        <summary>Our Contact Info</summary>
                        <p>Phone: <a href="tel:8452130082">845-213-0082</a></p>
                        <p>Email: <a href="mailto:newcountysuite@gmail.com">newcountysuite@gmail.com</a></p>
                    </details>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>

                </div>

            </div>
        </div>
    );
}