import htmx from 'htmx.org';
const mainArea = document.getElementById('brokers-main') as HTMLDivElement;
const mobileMenuBurger = document.querySelector(
  '.mobile-broker-menu-icon'
) as HTMLDivElement;

let hasRun = false;
const requestMedDeniedList = [
  'Mounjaro',
  'Monujaro',
  'Mounjro',
  'Moungaro',
  'Mounjaro',
  'Mounjaor',
  'Mounjair',
  'Monjaro',
  'Mounjarro',
  'Mounjrao',
  'Mounjaryo',
  'Zepbound',
  'Zepboud',
  'Zeppbound',
  'Zepbonud',
  'Zepbuond',
  'Zeppboud',
  'Zepbounde',
  'Zepboun',
  'Zepbouned',
  'Zepbund',
  'Zepobund',
  'Trulicity',
  'Trulicty',
  'Truliciti',
  'Trulicitys',
  'Trulicety',
  'Truliciy',
  'Trulecity',
  'Trulictiy',
  'Truelicity',
  'Trulycity',
  'Trollicity',
  'Tirzepatied',

  'Tirzepatid',

  'Tirzapatide',

  'Tirzeptide',

  'Tirzepetide',
  'Tirzepatine',
  'Terzepatide',
  'Tirzepaide',
  'Tirzapetide',
  'Tirzepatidde',
];

htmx.onLoad(function (content) {
  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get('utm_campaign');
  function sendPathnameToIframe(iframeId: string) {
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    switch (source) {
      case 'naacp':
        sendMessageToIframe(iframeId, { source: 'naacp' });
        break;
      case 'fym':
        sendMessageToIframe(iframeId, { source: 'fym' });
        break;
      case 'jr':
        sendMessageToIframe(iframeId, { source: 'jr' });
        break;
      case 'zch':
        sendMessageToIframe(iframeId, { source: 'zch' });
        break;
      case 'chc':
        sendMessageToIframe(iframeId, { source: 'chc' });
        break;
      case 'eprime':
        sendMessageToIframe(iframeId, { source: 'eprime' });
        break;
      case 'pinnacle':
        sendMessageToIframe(iframeId, { source: 'pinnacle' });
        break;
      case 'delta':
        sendMessageToIframe(iframeId, { source: 'delta' });
        break;
      case 'sparks':
        sendMessageToIframe(iframeId, { source: 'sparks' });
        break;
      case 'abi':
        sendMessageToIframe(iframeId, { source: 'abi' });
        break;
      case 'uip':
        sendMessageToIframe(iframeId, { source: 'uip' });
        break;
      case 'sterling':
        sendMessageToIframe(iframeId, { source: 'sterling' });
        break;
      case 'fenyx':
        sendMessageToIframe(iframeId, { source: 'fenyx' });
        break;
      default:
        sendMessageToIframe(iframeId, { source: 'website' });
    }

    if (iframe && iframe.contentWindow) {
      const pathname = window.location.pathname;
      iframe.contentWindow.postMessage({ pathname }, '*');
    }
  }
  // Check if the function has already run
  const links = document.querySelectorAll('.brokers-menu-link');

  // Run the function only if it hasn't run before
  if (!hasRun) {
    checkQueryParams();
    hasRun = true;
  }

  content.addEventListener('htmx:load', function (event) {
    if ((event.target as Element).id === 'eligibility-calc') {
      setTimeout(() => sendPathnameToIframe('eligibility-calc'), 1000);
    } else if ((event.target as Element).id === 'medication-list') {
      setTimeout(() => sendPathnameToIframe('medication-list'), 1000);
    } else if (
      (event.target as Element).id === 'general-medicare-calc' ||
      'medicare-calc'
    ) {
      setTimeout(() => sendPathnameToIframe('medicare-calc'), 1000);
    }

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
        const medicationName = (
          requestMedForm.querySelector('#medication-name') as HTMLInputElement
        ).value.trim();
        if (requestMedDeniedList.includes(medicationName)) {
          e.preventDefault();
          alert('We currently not accepting requests for this medication.');
          return;
        }
        let emailTo;
        switch (source) {
          case 'naacp':
            emailTo = 'brokers@transparentpricerx.com';
            break;
          case 'fym':
            emailTo = 'brokers@transparentpricerx.com';
            break;
          case 'jr':
            emailTo = 'brokers@transparentpricerx.com';
            break;
          case 'zch':
            emailTo = 'brokers@transparentpricerx.com';
            break;
          case 'pinnacle':
            emailTo = 'pinnacle@transparentpricerx.com';
            break;
          case 'chc':
            emailTo = 'chcquotes@transparentpricerx.com';
            break;
          case 'delta':
            emailTo = 'deltaagents@transparentpricerx.com';
            break;
          case 'sparks':
            emailTo = 'sparksagnets@transparentpricerx.com';
            break;
          case 'uip':
            emailTo = 'uipagents@transparentpricerx.com';
            break;
          case 'sterling':
            emailTo = 'sterling@transparentpricerx.com';
            break;
          case 'abi':
            emailTo = 'abi@transparentpricerx.com';
            break;
          case 'fenyx':
            emailTo = 'fenyxhealth@transparentpricerx.com';
            break;
        }
        const data = {
          toEmail: emailTo,
          agentSource: source,
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
      const players = Array.from(document.querySelectorAll('.tprx-video')).map(
        //@ts-ignore
        (p) => new Plyr(p)
      );
    }
    if ((event.target as Element).id === 'client-guidelines') {
      //@ts-ignore
      Webflow.require('tabs').redraw();
      const druglistLinks = document.querySelectorAll(
        '[cdtarget="medication-list"]'
      );
      druglistLinks.forEach((link) => {
        link.addEventListener('click', function () {
          document
            .querySelector('[hx-select="#medication-list"]')!
            .dispatchEvent(new Event('click'));
        });
      });
    }
    if ((event.target as Element).id === 'contact-us') {
      const emailLink = document.getElementById(
        'email-link'
      ) as HTMLLinkElement;
      const contactText = document.getElementById(
        'contact-text'
      ) as HTMLParagraphElement;
      let email = '';
      switch (source) {
        case 'abi':
          emailLink.innerHTML = 'abi@transparentpricerx.com';
          email = 'abi@transparentpricerx.com';
          break;
        case 'chc':
          emailLink.innerHTML = 'CHCquotes@transparentpricerx.com';
          email = 'CHCquotes@transparentpricerx.com';
          break;
        case 'pinnacle':
          emailLink.innerHTML = 'pinnacle@transparentpricerx.com';
          email = 'pinnacle@transparentpricerx.com';
          contactText.innerHTML =
            'For further information, reach out directly to the founder, Douglas Pierce, at <a href="mailto:douglas@transparentpricerx.com">douglas@transparentpricerx.com</a>';
          break;
        case 'delta':
          emailLink.innerHTML = 'deltaagents@transparentpricerx.com';
          email = 'deltaagents@transparentpricerx.com';
          break;
        case 'sparks':
          emailLink.innerHTML = 'sparksagents@transparentpricerx.com';
          email = 'sparksagents@transparentpricerx.com';
          break;
        case 'uip':
          emailLink.innerHTML = 'uipagents@transparentpricerx.com';
          email = 'uipagents@transparentpricerx.com';
          break;
        case 'sterling':
          emailLink.innerHTML = 'sterling@transparentpricerx.com';
          email = 'sterling@transparentpricerx.com';
          break;
        case 'fenyx':
          emailLink.innerHTML = 'fenyxhealth@transparentpricerx.com';
          email = 'fenyxhealth@transparentpricerx.com';
          break;
        default:
      }

      emailLink.href = `mailto:${email}`;
    }
    if ((event.target as Element).id === 'marketing-medicare') {
      if (source === 'naacp') {
        (
          document.querySelector('.marketing-materials-c') as HTMLElement
        ).style.display = 'block';
        document.getElementById('medicareemail')?.remove();
        document
          .getElementById('onepager')!
          .setAttribute(
            'href',
            'https://cdn.prod.website-files.com/64c1145cbf2b6e07020d3b41/681e2685ee84880768b25b9b_naacp.pdf'
          );
      }
      if (source === 'fym') {
        (
          document.querySelector('.marketing-materials-c') as HTMLElement
        ).style.display = 'block';
        document.getElementById('medicareemail')?.remove();
        document
          .getElementById('onepager')!
          .setAttribute(
            'href',
            'https://cdn.prod.website-files.com/64c1145cbf2b6e07020d3b41/681e2685ee84880768b25b9b_naacp.pdf'
          );
      }
      if (source === 'jr') {
        document
          .getElementById('onepager')!
          .setAttribute(
            'href',
            'https://cdn.prod.website-files.com/64c1145cbf2b6e07020d3b41/680bbf2a3e8b70a7734f9f07_mpJROnePager.pdf'
          );
      } else if (source === 'zch') {
        document
          .getElementById('onepager')!
          .setAttribute(
            'href',
            'https://cdn.prod.website-files.com/64c1145cbf2b6e07020d3b41/67d2dc31f8d1c0c328a9203a_mpZchOnePager.pdf'
          );
      } else if (source === 'uip') {
        document
          .getElementById('onepager')!
          .setAttribute(
            'href',
            'https://cdn.prod.website-files.com/64c1145cbf2b6e07020d3b41/67bdb608821f8f5bbec34520_uipOnePager.pdf'
          );
      } else if (source === 'sterling') {
        document
          .getElementById('onepager')!
          .setAttribute(
            'href',
            'https://cdn.prod.website-files.com/64c1145cbf2b6e07020d3b41/67bdb7612340d51173953493_sterlingOnePager.pdf'
          );
      } else if (source === 'delta') {
        document
          .getElementById('onepager')!
          .setAttribute(
            'href',
            'https://cdn.prod.website-files.com/64c1145cbf2b6e07020d3b41/67d139f823f84b93578a09a7_deltaOnePager.pdf'
          );
      }
      if (urlParams.get('brokerage') === 'malooley') {
        document
          .getElementById('onepager')!
          .setAttribute(
            'href',
            'https://cdn.prod.website-files.com/64c1145cbf2b6e07020d3b41/67af7ed155a8f4a32f9657a8_malooleyOnePager.pdf'
          );
      } else if (urlParams.get('brokerage') === 'horizon') {
        document
          .getElementById('onepager')!
          .setAttribute(
            'href',
            'https://cdn.prod.website-files.com/64c1145cbf2b6e07020d3b41/67af7ed62c34cb09aea10b0b_horizonOnePager.pdf'
          );
      }
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
  const brokerage = urlParams.get('brokerage');
  switch (source) {
    case 'fym':
      document
        .querySelector('.broker-copy-link')!
        .setAttribute(
          'r-copy-to-clipboard',
          'https://transparentpricerx.com/fym-self-enroll'
        );
      sendMessageToIframe('eligibility-calc', { source: 'fym' });
      sendMessageToIframe('medicare-calc', { source: 'fym' });
      sendMessageToIframe('medication-list', { source: 'fym' });
      document
        .querySelector('[hx-select="#video-tutorial-medicare"]')!
        .setAttribute('hx-select', '#video-tutorial-medicare-zch');
      break;
    case 'naacp':
      document
        .querySelector('.broker-copy-link')!
        .setAttribute(
          'r-copy-to-clipboard',
          'https://transparentpricerx.com/naacp-self-enroll'
        );
      sendMessageToIframe('eligibility-calc', { source: 'naacp' });
      sendMessageToIframe('medicare-calc', { source: 'naacp' });
      sendMessageToIframe('medication-list', { source: 'naacp' });
      document
        .querySelector('[hx-select="#video-tutorial-medicare"]')!
        .setAttribute('hx-select', '#video-tutorial-medicare-zch');
      break;
    case 'jr':
      document
        .querySelector('.broker-copy-link')!
        .setAttribute(
          'r-copy-to-clipboard',
          'https://transparentpricerx.com/jr-self-enroll'
        );
      sendMessageToIframe('eligibility-calc', { source: 'jr' });
      sendMessageToIframe('medicare-calc', { source: 'jr' });
      sendMessageToIframe('medication-list', { source: 'jr' });
      document
        .querySelector('[hx-select="#video-tutorial-medicare"]')!
        .setAttribute('hx-select', '#video-tutorial-medicare-zch');
      break;
    case 'zch':
      document
        .querySelector('.broker-copy-link')!
        .setAttribute(
          'r-copy-to-clipboard',
          'https://transparentpricerx.com/mp-self-enroll'
        );
      sendMessageToIframe('eligibility-calc', { source: 'zch' });
      sendMessageToIframe('medicare-calc', { source: 'zch' });
      sendMessageToIframe('medication-list', { source: 'zch' });
      document
        .querySelector('[hx-select="#video-tutorial-medicare"]')!
        .setAttribute('hx-select', '#video-tutorial-medicare-zch');
      break;
    case 'chc':
      (document.querySelector(
        '.chc-broker-logo'
      ) as HTMLElement)!.style.display = 'block';
      document
        .querySelector('.broker-copy-link')!
        .setAttribute(
          'r-copy-to-clipboard',
          'https://transparentpricerx.com/chc-self-enroll'
        );
      sendMessageToIframe('eligibility-calc', { source: 'chc' });
      sendMessageToIframe('medicare-calc', { source: 'chc' });
      sendMessageToIframe('medication-list', { source: 'chc' });
      break;
    case 'eprime':
      (document.querySelector(
        '.eprime-broker-logo'
      ) as HTMLElement)!.style.display = 'block';
      document
        .querySelector('[hx-select="#general-medicare-calc"]')!
        .classList.add('hidden');
      document
        .querySelector('.broker-copy-link')!
        .setAttribute(
          'r-copy-to-clipboard',
          'https://transparentpricerx.com/ep-self-enroll'
        );
      sendMessageToIframe('eligibility-calc', { source: 'eprime' });
      sendMessageToIframe('medicare-calc', { source: 'eprime' });
      sendMessageToIframe('medication-list', { source: 'eprime' });
      break;
    case 'pinnacle':
      sendMessageToIframe('eligibility-calc', { source: 'pinnacle' });
      sendMessageToIframe('medication-list', { source: 'pinnacle' });
      (document.querySelector(
        '.pinnacle-broker-logo'
      ) as HTMLElement)!.style.display = 'block';
      document
        .querySelector('[hx-select="#marketing"]')!
        .setAttribute('hx-select', '#marketing-pinnacle');
      document
        .querySelector('.broker-copy-link')!
        .setAttribute(
          'r-copy-to-clipboard',
          'https://transparentpricerx.com/pinnacle-self-enroll'
        );
      break;
    case 'delta':
      (document.querySelector('.deltalogo-c') as HTMLElement)!.style.display =
        'flex';
      sendMessageToIframe('medication-list', { source: 'delta' });
      sendMessageToIframe('medicare-calc', { source: 'delta' });
      document
        .querySelector('.broker-copy-link')!
        .setAttribute(
          'r-copy-to-clipboard',
          'https://transparentpricerx.com/delta-self-enroll'
        );
      break;
    case 'sparks':
      (document.querySelector('.sparks-logo') as HTMLElement)!.style.display =
        'block';
      sendMessageToIframe('medication-list', { source: 'sparks' });
      sendMessageToIframe('medicare-calc', { source: 'sparks' });
      document
        .querySelector('.broker-copy-link')!
        .setAttribute(
          'r-copy-to-clipboard',
          'https://transparentpricerx.com/sparks-self-enroll'
        );
      break;
    case 'fenyx':
      (document.querySelector('.fenyx-logo') as HTMLElement)!.style.display =
        'block';
      sendMessageToIframe('medication-list', { source: 'fenyx' });
      sendMessageToIframe('medicare-calc', { source: 'fenyx' });
      document
        .querySelector('.broker-copy-link')!
        .setAttribute(
          'r-copy-to-clipboard',
          'https://transparentpricerx.com/fenyxhealth-self-enroll'
        );
      document
        .querySelector('[hx-select="#marketing-medicare"]')!
        .setAttribute('hx-select', '#marketing-medicare-fenyx');
      break;
    case 'abi':
      if (brokerage === 'malooley') {
        (document.querySelector(
          '.malooley-logo'
        ) as HTMLElement)!.style.display = 'block';
        document
          .querySelector('.broker-copy-link')!
          .setAttribute(
            'r-copy-to-clipboard',
            'https://transparentpricerx.com/malooley-self-enroll'
          );
      } else if (brokerage === 'horizon') {
        (document.querySelector(
          '.horizon-logo'
        ) as HTMLElement)!.style.display = 'block';
        document
          .querySelector('.broker-copy-link')!
          .setAttribute(
            'r-copy-to-clipboard',
            'https://transparentpricerx.com/horizon-self-enroll'
          );
      } else {
        (document.querySelector(
          '.abi-broker-logo'
        ) as HTMLElement)!.style.display = 'block';

        document
          .querySelector('.broker-copy-link')!
          .setAttribute(
            'r-copy-to-clipboard',
            'https://transparentpricerx.com/abi-self-enroll'
          );
      }
      sendMessageToIframe('eligibility-calc', { source: 'abi' });
      sendMessageToIframe('medicare-calc', { source: 'abi' });
      sendMessageToIframe('medication-list', { source: 'abi' });
      break;
    case 'uip':
      (document.querySelector('.uip-logo') as HTMLElement)!.style.display =
        'block';
      document
        .querySelector('.broker-copy-link')!
        .setAttribute(
          'r-copy-to-clipboard',
          'https://transparentpricerx.com/uip-self-enroll'
        );
      sendMessageToIframe('eligibility-calc', { source: 'uip' });
      sendMessageToIframe('medicare-calc', { source: 'uip' });
      sendMessageToIframe('medication-list', { source: 'uip' });
      break;
    case 'sterling':
      (document.querySelector('.sterling-logo') as HTMLElement)!.style.display =
        'block';
      document
        .querySelector('.broker-copy-link')!
        .setAttribute(
          'r-copy-to-clipboard',
          'https://transparentpricerx.com/sterling-self-enroll'
        );

      sendMessageToIframe('eligibility-calc', { source: 'sterling' });
      sendMessageToIframe('medicare-calc', { source: 'sterling' });
      sendMessageToIframe('medication-list', { source: 'sterling' });
      break;
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

function sendMessageToIframe(iframeId: string, message: any) {
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(message, '*');
  }
}
