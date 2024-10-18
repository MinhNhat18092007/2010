(() => {
    const $ = document.querySelector.bind(document);

    let timeRotate = 7000; // 7 giây
    let currentRotate = 0;
    let isRotating = false;
    const wheel = $('.wheel');
    const btnWheel = $('.btn--wheel');
    const showMsg = $('.msg');
    const spinSound = document.getElementById('spinSound'); // Thêm dòng này
    const checkSound = document.getElementById('checkSound'); // Thêm dòng này
    

    //=====< Danh sách phần thưởng >=====
    const listGift = [
        { text: '1', percent: 10 / 100 },
        { text: '2', percent: 10 / 100 },
        { text: '3', percent: 10 / 100 },
        { text: '4', percent: 10 / 100 },
        { text: '5', percent: 10 / 100 },
        { text: '6', percent: 10 / 100 },
        { text: '7', percent: 10 / 100 },
        { text: '8', percent: 10 / 100 },
        { text: '9', percent: 10 / 100 },
        { text: '10', percent: 10 / 100 },
        { text: '11', percent: 10 / 100 },
        { text: '12', percent: 10 / 100 },
        { text: '13', percent: 10 / 100 },
        { text: '14', percent: 10 / 100 },
    ];

    //=====< Số lượng phần thưởng >=====
    const size = listGift.length;

    //=====< Số đo góc của 1 phần thưởng chiếm trên hình tròn >=====
    const rotate = 360 / size;

    //=====< Số đo góc cần để tạo độ nghiêng, 90 độ trừ đi góc của 1 phần thưởng chiếm >=====
    const skewY = 90 - rotate;

    listGift.map((item, index) => {
        //=====< Tạo thẻ li >=====
        const elm = document.createElement('li');

        //=====< Xoay và tạo độ nghiêng cho các thẻ li >=====
        elm.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;

        //=====< Thêm background-color so le nhau và căn giữa cho các thẻ text >=====
        elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);" class="text ${index % 2 === 0 ? 'text-1' : 'text-2'}">
            <b>${item.text}</b>
        </p>`;

        //=====< Thêm vào thẻ ul >=====
        wheel.appendChild(elm);
    });

    /********** Hàm bắt đầu **********/
    const start = async () => {
        showMsg.innerHTML = '';
        isRotating = true;
        spinSound.play(); // Phát âm thanh

        //=====< Lấy danh sách số đã chọn >=====
        const usedNumbers = await getUsedNumbers();

        //=====< Lấy 1 số ngẫu nhiên 0 -> 1 >=====
        const random = Math.random();

        //=====< Gọi hàm lấy phần thưởng >=====
        const gift = getGift(random, usedNumbers);

        //=====< Số vòng quay: 360 độ = 1 vòng (Góc quay hiện tại) >=====
        currentRotate += 360 * 10;

        //=====< Gọi hàm quay >=====
        rotateWheel(currentRotate, gift.index);

        // Ghi số vào tệp nếu chưa được sử dụng
        if (!usedNumbers.includes(gift.text)) {
            await saveNumberToFile(gift.text);
        }

        //=====< Gọi hàm in ra màn hình >=====
        showGift(gift);
    };

    /********** Hàm quay vòng quay **********/
    const rotateWheel = (currentRotate, index) => {
        $('.wheel').style.transform = `rotate(${
            currentRotate - index * rotate - rotate / 2
        }deg)`;
    };

    /********** Hàm lấy phần thưởng **********/
    const getGift = (randomNumber, usedNumbers) => {
        let currentPercent = 0;
        let list = [];

        listGift.forEach((item, index) => {
            if (usedNumbers.includes(item.text)) return; // Bỏ qua nếu số đã sử dụng

            currentPercent += item.percent;

            if (randomNumber <= currentPercent) {
                list.push({ ...item, index });
            }
        });

        return list[0] || {}; // Trả về phần thưởng đầu tiên hoặc đối tượng trống nếu không có
    };

    /********** In phần thưởng ra màn hình **********/
    const showGift = gift => {
        let timer = setTimeout(() => {
            isRotating = false;

            switch (gift.text) {
                case '1':
                    showMsg.innerHTML = 'Chúc Loan có một ngày 20/10 thật tuyệt với những điều bất ngờ!';
                    break;
                case '2':
                    showMsg.innerHTML = 'Chúc Tuyết có một ngày 20/10 đầy niềm vui và hạnh phúc!';
                    break;
                case '3':
                    showMsg.innerHTML = 'Chúc Vy có một ngày 20/10 thật đặc biệt bên những người yêu thương!';
                    break;
                case '4':
                    showMsg.innerHTML = 'Chúc Kiều Trang luôn rực rỡ và tỏa sáng như ánh nắng trong ngày 20/10!';
                    break;
                case '5':
                    showMsg.innerHTML = 'Chúc Thùy Trang mãi xinh đẹp và thành công trong công việc vào ngày 20/10!';
                    break;
                case '6':
                    showMsg.innerHTML = 'Chúc Nhung nhận được thật nhiều quà và yêu thương trong ngày 20/10!';
                    break;
                case '7':
                    showMsg.innerHTML = 'Chúc Quỳnh có một ngày 20/10 thật tuyệt vời với những kỷ niệm đáng nhớ!';
                    break;
                case '8':
                    showMsg.innerHTML = 'Chúc Việt Anh luôn vui vẻ và tràn đầy năng lượng trong ngày 20/10!';
                    break;
                case '9':
                    showMsg.innerHTML = 'Chúc Đan Linh có một ngày 20/10 tràn ngập tiếng cười và niềm vui!';
                    break;
                case '10':
                    showMsg.innerHTML = 'Chúc Nguyên có một ngày 20/10 đầy ắp yêu thương và sự quan tâm!';
                    break;
                case '11':
                    showMsg.innerHTML = 'Chúc Mỹ Linh luôn tự tin và vững bước trong cuộc sống vào ngày 20/10!';
                    break;
                case '12':
                    showMsg.innerHTML = 'Chúc Huyền tìm được hạnh phúc và niềm vui trong ngày 20/10!';
                    break;
                case '13':
                    showMsg.innerHTML = 'Chúc Vy Cầm được thưởng thức những điều ngọt ngào nhất trong ngày 20/10!';
                    break;
                case '14':
                    showMsg.innerHTML = 'Chúc Ánh có một ngày 20/10 thật ý nghĩa và ấm áp!';
                    break;
                default:
                    showMsg.innerHTML = 'Chúc các bạn nữ 12A1 có một ngày lễ 20/10 thật tuyệt vời!';
                    break;
            }
    
            checkSound.play();
            // Gọi hàm để hiển thị hình ảnh và caption
            showPrizeImage(gift);
            checkSound.play();

            clearTimeout(timer);
        }, timeRotate);
    };

    // Hàm hiển thị hình ảnh phần thưởng và caption
    const showPrizeImage = gift => {
        const prizeImage = document.getElementById('prizeImage');
        const prizeCaption = document.getElementById('prizeCaption');
        checkSound.play();

        // Cập nhật nguồn hình ảnh và caption
        prizeImage.src = `img/${gift.text}.jpg`; // Giả định tên hình ảnh là tên phần thưởng với đuôi .jpg
        // prizeImage.src = `img/test.jpg`; // Giả định tên hình ảnh là tên phần thưởng với đuôi .jpg
        prizeCaption.innerText = gift.text; // Hiển thị caption

        // Điều chỉnh chiều cao của hình ảnh sao cho bằng chiều cao của trang web
        const windowHeight = window.innerHeight;
        prizeImage.style.height = `${windowHeight}px`;
        prizeImage.style.width = 'auto'; // Giữ tỷ lệ hình ảnh
        
    };

    // Hàm ghi số đã chọn vào tệp
    const saveNumberToFile = async (number) => {
        try {
            await fetch('/save-number', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ number })
            });
        } catch (error) {
            console.error('Error saving number:', error);
        }
    };

    // Hàm lấy danh sách các số đã chọn từ tệp
    const getUsedNumbers = async () => {
        try {
            const response = await fetch('/get-numbers');
            const data = await response.json();
            return data.numbers; // Trả về danh sách các số đã sử dụng
        } catch (error) {
            console.error('Error fetching used numbers:', error);
            return [];
        }
    };

    // Cập nhật hàm click để phát âm thanh khi nhấn nút quay thưởng
    btnWheel.addEventListener('click', () => {
        if (!isRotating) {
            spinSound.play(); // Phát âm thanh quay thưởng
            start();
        }
    });
})();
