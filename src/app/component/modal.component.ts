
export class ModalComponent {

    public openOneModal(modalId : string) {

        const modal = document.getElementById(modalId);
        modal.classList.remove('hide');
        modal.classList.add('show');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('style', 'display: block');   
    }
    public closeOneModal(modalId) {

        const modal = document.getElementById(modalId);
        modal.classList.remove('show');
        modal.classList.add('hide');
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('style', 'display: none');
    }
}