
async function apitzch01() {
    'use strict';

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),searchParams = new URLSearchParams(location.hash);

    if (qSelectorAll(IMAGE) && qSelectorAll(IMAGE).length == 9 && qSelector(NO_SELECTION).getAttribute(ARIA_HIDDEN) != true) {
    await sleep(TIME_SOLVE);
    const imgs = document.querySelectorAll('.task-image .image');
    if (imgs.length === 0) {waitForImagesToAppear();}
    const {task, task_url, cells, urls} = await on_task_ready();
        let response = await fetch(url, {
		method: 'POST',
        headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
    "type":"hcaptcha",
    "task":task,
    "key":APIKEY,
    "url":searchParams.get("host"),
    "image_urls":urls
        }),
	})
    var rp = await response.json();
    let taskId = rp.data
    getrslt(taskId,cells)
}
    async function getrslt(cc,aa){
	 let response = await fetch(`${url}?key=${APIKEY}&id=${cc}`)

     var rp = await response.json();
        if (rp.error) {
         await sleep(300);
         rp = await (await fetch(response.url)).json();
        }
        if (rp.data) {
         for (let i = 0; i < rp.data.length; i++) {
            if (rp.data[i] === false) {
                continue;
            }

            if (!is_cell_selected(aa[i])) {
                aa[i].click();
                await sleep(200);
            }
        }
           await sleep(TIME_SUB);
          document.querySelector('.button-submit').click();
           await sleep(200)
          waitForImagesToAppear();
        }
}
}
/************************************************************************************************/

function get_image_url(aa) {
        const matches = aa?.style['background']?.trim()?.match(/(?!^)".*?"/g);
        if (!matches || matches.length === 0) {
            return null;
        }
        return matches[0].replaceAll('"', '');
    }


/************************************************************************************************/

    async function get_task() {
        let task = document.querySelector('h2.prompt-text')?.innerText?.replace(/\s+/g, ' ')?.trim();
        if (!task) {
            return null;
        }

        const CODE = {
            '0430': 'a','0441': 'c','0501': 'd','0065': 'e','0435': 'e','04bb': 'h','0069': 'i','0456': 'i','0458': 'j','03f3': 'j','04cf': 'l','03bf': 'o','043e': 'o','0440': 'p','0455': 's','0445': 'x','0443': 'y','0335': '-',
        };

/************************************************************************************************/

        function pad_left(s, char, n) {
            while (`${s}`.length < n) {
                s = `${char}${s}`;
            }
            return s;
        }

/************************************************************************************************/

        const new_task = [];
        for (const e of task) {
            const k = pad_left(e.charCodeAt(0).toString(16), '0', 4);
            if (k in CODE) {
                new_task.push(CODE[k]);
            }
            else {
                new_task.push(e);
            }
        }
        return new_task.join('');
    }


/************************************************************************************************/

    let last_urls_hash ;
    function on_task_ready(i=1000) {
        return new Promise(resolve => {
            let checking = false;
const check_interval = setInterval(async () => {


                let task = await get_task();
                if (!task) {
                    return;
                }

                const $task_image = document.querySelector('.challenge-example > .image > .image');
                const task_url = get_image_url($task_image);
                if (!task_url || task_url === '') {
                    return;
                }

                const $cells = document.querySelectorAll('.task-image');
                if ($cells.length !== 9) {
                    return;
                }

                const cells = [];
                const urls = [];
                for (const $e of $cells) {
                    const $img = $e.querySelector('div.image');
                    if (!$img) {
                        return;
                    }

                    const url = get_image_url($img);
                    if (!url || url === '') {
                        return;
                    }

                    cells.push($e);
                    urls.push(url);
                }

                clearInterval(check_interval);
                checking = false;
                console.log({task, task_url, cells, urls})
                return resolve({task, task_url, cells, urls});
            }, i);
        });
    }
 function is_cell_selected($cell) {
        return $cell.getAttribute('aria-pressed') === 'true';
    }
(async () => {
    let $start = null;let is_mousedown = false;let is_selecting = false;
    function toggle_img($e, enabled, include_start=false) {
        if (!$e) {return;}

        if (!include_start && $start === $e) {return;}

        if (enabled === true && $e.getAttribute('aria-pressed') === 'false') {$e.click();}
        else if (enabled === false && $e.getAttribute('aria-pressed') === 'true') {$e.click();}
    }
    document.addEventListener('mousedown', e => {
        if (e?.target?.parentNode?.getAttribute('aria-pressed') === 'false') {
            is_mousedown = true;is_selecting = true;
        }
        else if (e?.target?.parentNode?.getAttribute('aria-pressed') === 'true') {
            is_mousedown = true;is_selecting = false;
        }
        $start = e?.target?.parentNode;
    });
    document.addEventListener('mouseup', e => {
        is_mousedown = false;
        $start = null;
    });
    document.addEventListener('mousemove', e => {
        if (is_mousedown) {
            if ($start !== e?.target?.parentNode && $start !== null) {
                toggle_img($start, is_selecting, true);
            }
            toggle_img(e?.target?.parentNode, is_selecting);
        }
    });

    window.addEventListener('load', () => {
        const sheet = document.body.appendChild(document.createElement('style')).sheet;
        sheet.insertRule('[aria-pressed="true"] > .border-focus {background-color: #0f0 !important; opacity: 0.3 !important}', 0);
    });
})();

