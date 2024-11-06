import htmx from 'htmx.org';
const mainArea = document.getElementById('brokers-main') as HTMLDivElement;
const mobileMenuBurger = document.querySelector(
  '.mobile-broker-menu-icon'
) as HTMLDivElement;

let hasRun = false;

htmx.onLoad(function (content) {
  function sendPathnameToIframe(iframeId: string) {
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      const pathname = window.location.pathname;
      iframe.contentWindow.postMessage({ pathname }, '*');
    }
  }
  const links = document.querySelectorAll('.brokers-menu-link');
  // Check if the function has already run

  // Run the function only if it hasn't run before
  if (!hasRun) {
    checkQueryParams();
    hasRun = true;
  }

  content.addEventListener('htmx:load', function (event) {
    setTimeout(() => sendPathnameToIframe('medication-list'), 350);

    if ((event.target as Element).id === 'request') {
      // Re-init forms
      //@ts-ignore
      Webflow.require('forms').ready();
      const requestMedForm = document.getElementById(
        'wf-form-request-medication'
      ) as HTMLFormElement;
      const requestCta = document.getElementById(
        'submit-med-request'
      ) as HTMLButtonElement;

      requestCta.addEventListener('click', function (e) {
        if (
          (requestMedForm.querySelector('#broker-name') as HTMLInputElement)
            .value === '' ||
          (requestMedForm.querySelector('#medication-name') as HTMLInputElement)
            .value === ''
        )
          return;

        e.preventDefault();
        const data = {
          agentName: (requestMedForm.querySelector(
            '#broker-name'
          ) as HTMLInputElement)!.value,
          requestedMed: (
            requestMedForm.querySelector('#medication-name') as HTMLInputElement
          ).value,
          email: (
            requestMedForm.querySelector('#broker-email') as HTMLInputElement
          ).value,
          timestamp: new Date(),
        };

        requestCta!.value = 'Sending...';
        fetch(
          'https://us-central1-transparent-rx.cloudfunctions.net/requestMed',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        )
          .then((response) => {
            response;
            requestMedForm.style.display = 'none';
            (
              document.querySelector('.request-med-success') as HTMLDivElement
            ).style.display = 'block';
          })

          .catch((error) => {
            console.error('Error:', error);
          });
      });
      return;
    }

    if ((event.target as Element).id === 'video-tutorial') {
      //@ts-ignore
      const player = new Plyr('#player');
    }
    if ((event.target as Element).id === 'client-guidelines') {
      //@ts-ignore
      Webflow.require('tabs').redraw();
    }
    if ((event.target as Element).id === 'contact-us') {
      const emailLink = document.getElementById(
        'email-link'
      ) as HTMLLinkElement;
      emailLink.innerHTML = 'CHCquotes@transparentpricerx.com';
      const email = 'CHCquotes@transparentpricerx.com';
      emailLink.href = `mailto:${email}`;
    }
  });
  content.addEventListener('htmx:afterSwap', function () {
    mainArea!.scrollTop = 0;
  });
  links.forEach((link) => {
    link.addEventListener('click', function () {
      if (window.innerWidth < 992) {
        mobileMenuBurger.click();
      }
      link.classList.add('current');
      links.forEach((l) => {
        if (l !== link) {
          l.classList.remove('current');
        }
      });
    });
  });
});

function checkQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get('utm_campaign');
  const param1 = urlParams.get('section');
  if (source === 'chc') {
    (document.querySelector('.chc-broker-logo') as HTMLElement)!.style.opacity =
      '1';
  } else if (source === 'eprime') {
    document
      .querySelector('[hx-select="#general-medicare-calc"]')!
      .classList.add('hidden');
    document
      .querySelector('.broker-copy-link')!
      .setAttribute(
        'r-copy-to-clipboard',
        'https://transparentpricerx.com/ep-self-enroll'
      );
  }
  if (param1 === 'medications') {
    document
      .querySelector('[cd="drug-lookup"]')!
      .dispatchEvent(new Event('click'));
  } else if (param1 === 'info') {
    document
      .querySelector('[hx-select="#pre-enrollment"]')!
      .dispatchEvent(new Event('click'));
  }
}

const handleMessage = (event: MessageEvent) => {
  const { path } = event.data;
  if (path) {
    const pathParams = new URLSearchParams(path);
    let newUrl = new URL(window.location.href);

    // Add new params from the message
    pathParams.forEach((value, key) => {
      newUrl.searchParams.set(key, value);
    });

    // Update only the search params
    window.history.pushState({}, '', `?${newUrl.searchParams.toString()}`);
    //@ts-ignore
    appendUrlParametersToLinks();
  }
};

window.addEventListener('message', handleMessage);
