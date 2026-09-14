/* =========================================================
   MY SCHOOL AND COLLEGE OF SCIENCE AND TECHNOLOGY, SWABI
   Stable Main JavaScript
   Works directly from index.html
========================================================= */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        /* =====================================================
           PAGE LOADER
        ===================================================== */
        const loader = document.getElementById("loader");

        function hideLoader() {
            if (loader) {
                loader.classList.add("hidden");
            }
        }

        // Never leave the page covered by the loader.
        window.setTimeout(hideLoader, 700);
        window.addEventListener("load", hideLoader);


        /* =====================================================
           MOBILE NAVIGATION
        ===================================================== */
        const menuToggle = document.getElementById("menuToggle");
        const navMenu = document.getElementById("navMenu");

        if (menuToggle && navMenu) {
            menuToggle.addEventListener("click", function () {
                const isOpen = navMenu.classList.toggle("open");
                navMenu.classList.toggle("active", isOpen);
                menuToggle.classList.toggle("active", isOpen);
                menuToggle.setAttribute("aria-expanded", String(isOpen));
            });

            navMenu.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("click", function () {
                    navMenu.classList.remove("open", "active");
                    menuToggle.classList.remove("active");
                    menuToggle.setAttribute("aria-expanded", "false");
                });
            });
        }


        /* =====================================================
           SMOOTH INTERNAL LINKS
        ===================================================== */
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener("click", function (event) {
                const selector = this.getAttribute("href");

                if (!selector || selector === "#") {
                    return;
                }

                let target = null;

                try {
                    target = document.querySelector(selector);
                } catch (error) {
                    return;
                }

                if (!target) {
                    return;
                }

                event.preventDefault();

                const header = document.getElementById("header");
                const offset = header ? header.offsetHeight : 0;
                const top = target.getBoundingClientRect().top +
                    window.scrollY - offset;

                window.scrollTo({
                    top: Math.max(0, top),
                    behavior: "smooth"
                });
            });
        });


        /* =====================================================
           HEADER SCROLL EFFECT
        ===================================================== */
        const header = document.getElementById("header");

        function updateHeader() {
            if (!header) {
                return;
            }

            header.classList.toggle("scrolled", window.scrollY > 50);
        }

        window.addEventListener("scroll", updateHeader, { passive: true });
        updateHeader();


        /* =====================================================
           CURRENT YEAR
        ===================================================== */
        const currentYear = document.getElementById("currentYear");

        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }

        document.querySelectorAll(".current-year").forEach(function (element) {
            element.textContent = new Date().getFullYear();
        });


        /* =====================================================
           COUNTER ANIMATION
           HTML uses data-target="..."
        ===================================================== */
        const counters = document.querySelectorAll(".counter[data-target]");

        function animateCounter(counter) {
            const target = Number(counter.getAttribute("data-target"));

            if (!Number.isFinite(target)) {
                return;
            }

            const duration = 1400;
            const start = performance.now();

            function step(now) {
                const progress = Math.min((now - start) / duration, 1);
                const value = Math.floor(progress * target);

                counter.textContent = value.toLocaleString();

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }

            window.requestAnimationFrame(step);
        }

        if ("IntersectionObserver" in window) {
            const counterObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.35 });

            counters.forEach(function (counter) {
                counterObserver.observe(counter);
            });
        } else {
            counters.forEach(animateCounter);
        }


        /* =====================================================
           REVEAL ANIMATIONS
        ===================================================== */
        const revealElements = document.querySelectorAll(".reveal");

        if ("IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            revealElements.forEach(function (element) {
                revealObserver.observe(element);
            });
        } else {
            revealElements.forEach(function (element) {
                element.classList.add("visible");
            });
        }


        /* =====================================================
           ADMISSION RIBBON
        ===================================================== */
        window.closeAdmissionRibbon = function () {
            const ribbon = document.getElementById("admissionRibbon");

            if (!ribbon) {
                return;
            }

            ribbon.classList.add("closed");

            window.setTimeout(function () {
                ribbon.style.display = "none";
            }, 450);
        };


        /* =====================================================
           ADMISSION MODAL
        ===================================================== */
        const admissionModal = document.getElementById("admissionModal");
        const openAdmission = document.getElementById("openAdmission");
        const closeAdmission = document.getElementById("closeAdmission");

        function openAdmissionModal() {
            if (!admissionModal) {
                return;
            }

            admissionModal.classList.add("show");
            document.body.classList.add("modal-open");

            if (closeAdmission) {
                closeAdmission.focus();
            }
        }

        function closeAdmissionModal() {
            if (!admissionModal) {
                return;
            }

            admissionModal.classList.remove("show");
            document.body.classList.remove("modal-open");
        }

        if (openAdmission) {
            openAdmission.addEventListener("click", openAdmissionModal);
        }

        if (closeAdmission) {
            closeAdmission.addEventListener("click", closeAdmissionModal);
        }

        if (admissionModal) {
            const overlay = admissionModal.querySelector(".modal-overlay");

            if (overlay) {
                overlay.addEventListener("click", closeAdmissionModal);
            }
        }


        /* =====================================================
           GALLERY FILTER
        ===================================================== */
        const filterButtons = document.querySelectorAll(".filter-btn");
        const galleryItems = document.querySelectorAll(".gallery-item");

        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const filter = button.getAttribute("data-filter");

                filterButtons.forEach(function (item) {
                    item.classList.remove("active");
                });

                button.classList.add("active");

                galleryItems.forEach(function (item) {
                    const show = filter === "all" || item.classList.contains(filter);
                    item.style.display = show ? "" : "none";
                });
            });
        });


        /* =====================================================
           GALLERY LIGHTBOX
        ===================================================== */
        const lightbox = document.getElementById("lightbox");
        const lightboxImage = document.getElementById("lightboxImage");
        const lightboxClose = document.getElementById("lightboxClose");
        const lightboxPrev = document.getElementById("lightboxPrev");
        const lightboxNext = document.getElementById("lightboxNext");

        let lightboxImages = [];
        let lightboxIndex = 0;

        function refreshLightboxImages() {
            lightboxImages = Array.from(
                document.querySelectorAll(".gallery-item:not([style*='display: none']) img")
            );
        }

        function showLightbox(index) {
            refreshLightboxImages();

            if (!lightbox || !lightboxImage || !lightboxImages.length) {
                return;
            }

            lightboxIndex = (index + lightboxImages.length) % lightboxImages.length;
            lightboxImage.src = lightboxImages[lightboxIndex].src;
            lightboxImage.alt = lightboxImages[lightboxIndex].alt || "Gallery preview";
            lightbox.classList.add("show");
            document.body.classList.add("modal-open");
        }

        function closeLightbox() {
            if (!lightbox) {
                return;
            }

            lightbox.classList.remove("show");
            document.body.classList.remove("modal-open");

            if (lightboxImage) {
                lightboxImage.removeAttribute("src");
            }
        }

        galleryItems.forEach(function (item) {
            item.addEventListener("click", function () {
                refreshLightboxImages();

                const image = item.querySelector("img");
                const index = lightboxImages.indexOf(image);

                showLightbox(index >= 0 ? index : 0);
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener("click", closeLightbox);
        }

        if (lightboxPrev) {
            lightboxPrev.addEventListener("click", function () {
                showLightbox(lightboxIndex - 1);
            });
        }

        if (lightboxNext) {
            lightboxNext.addEventListener("click", function () {
                showLightbox(lightboxIndex + 1);
            });
        }


        /* =====================================================
           TESTIMONIAL SLIDER
        ===================================================== */
        const testimonialTrack = document.getElementById("testimonialTrack");
        const testimonialSlides = testimonialTrack
            ? Array.from(testimonialTrack.querySelectorAll(".testimonial"))
            : [];
        const prevTestimonial = document.getElementById("prevTestimonial");
        const nextTestimonial = document.getElementById("nextTestimonial");
        const sliderDots = document.getElementById("sliderDots");

        let testimonialIndex = 0;

        function updateTestimonial() {
            if (!testimonialTrack || !testimonialSlides.length) {
                return;
            }

            testimonialTrack.style.transform =
                "translateX(-" + (testimonialIndex * 100) + "%)";

            if (sliderDots) {
                const dots = sliderDots.querySelectorAll(".dot");

                dots.forEach(function (dot, index) {
                    dot.classList.toggle("active", index === testimonialIndex);
                });
            }
        }

        if (prevTestimonial) {
            prevTestimonial.addEventListener("click", function () {
                testimonialIndex =
                    (testimonialIndex - 1 + testimonialSlides.length) %
                    testimonialSlides.length;

                updateTestimonial();
            });
        }

        if (nextTestimonial) {
            nextTestimonial.addEventListener("click", function () {
                testimonialIndex =
                    (testimonialIndex + 1) %
                    testimonialSlides.length;

                updateTestimonial();
            });
        }

        if (sliderDots) {
            sliderDots.querySelectorAll(".dot").forEach(function (dot, index) {
                dot.addEventListener("click", function () {
                    if (index < testimonialSlides.length) {
                        testimonialIndex = index;
                        updateTestimonial();
                    }
                });
            });
        }


        /* =====================================================
           FAQ ACCORDION
        ===================================================== */
        document.querySelectorAll(".faq-question").forEach(function (question) {
            question.addEventListener("click", function () {
                const item = question.closest(".faq-item");

                if (!item) {
                    return;
                }

                const answer = item.querySelector(".faq-answer");
                const wasActive = item.classList.contains("active");

                document.querySelectorAll(".faq-item.active").forEach(function (activeItem) {
                    activeItem.classList.remove("active");

                    const activeAnswer = activeItem.querySelector(".faq-answer");
                    if (activeAnswer) {
                        activeAnswer.style.maxHeight = null;
                    }
                });

                if (!wasActive) {
                    item.classList.add("active");

                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    }
                }
            });
        });


        /* =====================================================
           NOTIFICATION
        ===================================================== */
        const notification = document.getElementById("notification");
        const notificationTitle = document.getElementById("notificationTitle");
        const notificationMessage = document.getElementById("notificationMessage");
        const notificationClose = document.getElementById("notificationClose");
        let notificationTimer = null;

        window.showNotification = function (titleOrMessage, messageOrType, maybeType) {
            if (!notification) {
                return;
            }

            let title = "Success";
            let message = "";

            if (maybeType !== undefined) {
                title = titleOrMessage || "Success";
                message = messageOrType || "";
            } else {
                message = titleOrMessage || "";
                if (messageOrType === "error") {
                    title = "Error";
                }
            }

            if (notificationTitle) {
                notificationTitle.textContent = title;
            }

            if (notificationMessage) {
                notificationMessage.textContent = message;
            }

            notification.classList.remove("error", "success");
            notification.classList.add(
                (maybeType || messageOrType) === "error" ? "error" : "success"
            );
            notification.classList.add("show");

            window.clearTimeout(notificationTimer);
            notificationTimer = window.setTimeout(function () {
                notification.classList.remove("show");
            }, 5000);
        };

        if (notificationClose) {
            notificationClose.addEventListener("click", function () {
                notification.classList.remove("show");
            });
        }


        /* =====================================================
           CONTACT FORM
        ===================================================== */
        const contactForm = document.getElementById("contactForm");

        if (contactForm) {
            contactForm.addEventListener("submit", function (event) {
                event.preventDefault();

                if (!contactForm.checkValidity()) {
                    contactForm.reportValidity();
                    return;
                }

                window.showNotification(
                    "Message Sent",
                    "Your message has been submitted successfully.",
                    "success"
                );

                contactForm.reset();
            });
        }


        /* =====================================================
           STUDENT PHOTO UPLOAD
        ===================================================== */
        const admissionForm = document.getElementById("admissionForm");
        const studentPhoto = document.getElementById("studentPhoto");
        const studentPhotoPreview = document.getElementById("studentPhotoPreview");
        const photoPlaceholder = document.getElementById("photoPlaceholder");
        const printStudentPhoto = document.getElementById("printStudentPhoto");

        let uploadedStudentPhoto = "";

        function resetPhoto() {
            uploadedStudentPhoto = "";

            if (studentPhoto) {
                studentPhoto.value = "";
            }

            if (studentPhotoPreview) {
                studentPhotoPreview.removeAttribute("src");
                studentPhotoPreview.style.display = "none";
            }

            if (photoPlaceholder) {
                photoPlaceholder.style.display = "flex";
            }

            if (printStudentPhoto) {
                printStudentPhoto.removeAttribute("src");
                printStudentPhoto.style.display = "none";
            }
        }

        if (studentPhoto) {
            studentPhoto.addEventListener("change", function () {
                const file = this.files && this.files[0];

                if (!file) {
                    resetPhoto();
                    return;
                }

                const allowedTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/webp"
                ];

                if (!allowedTypes.includes(file.type)) {
                    window.showNotification(
                        "Invalid Photo",
                        "Please upload a JPG, PNG or WEBP image.",
                        "error"
                    );
                    resetPhoto();
                    return;
                }

                if (file.size > 5 * 1024 * 1024) {
                    window.showNotification(
                        "Photo Too Large",
                        "Please select an image smaller than 5 MB.",
                        "error"
                    );
                    resetPhoto();
                    return;
                }

                const reader = new FileReader();

                reader.onload = function (event) {
                    const dataUrl = event.target.result;

                    if (typeof dataUrl !== "string" ||
                        !dataUrl.startsWith("data:image/")) {
                        resetPhoto();
                        return;
                    }

                    const imageTest = new Image();

                    imageTest.onload = function () {
                        uploadedStudentPhoto = dataUrl;

                        if (studentPhotoPreview) {
                            studentPhotoPreview.src = dataUrl;
                            studentPhotoPreview.style.display = "block";
                        }

                        if (photoPlaceholder) {
                            photoPlaceholder.style.display = "none";
                        }

                        if (printStudentPhoto) {
                            printStudentPhoto.src = dataUrl;
                            printStudentPhoto.style.display = "block";
                        }

                        window.showNotification(
                            "Photo Uploaded",
                            "Student photograph uploaded successfully.",
                            "success"
                        );
                    };

                    imageTest.onerror = function () {
                        window.showNotification(
                            "Invalid Photo",
                            "The selected image could not be read.",
                            "error"
                        );
                        resetPhoto();
                    };

                    imageTest.src = dataUrl;
                };

                reader.onerror = function () {
                    window.showNotification(
                        "Upload Error",
                        "Unable to read the selected photo.",
                        "error"
                    );
                    resetPhoto();
                };

                reader.readAsDataURL(file);
            });
        }


        /* =====================================================
           ADMISSION FORM -> PRINTABLE STUDENT FILE
        ===================================================== */
        function valueOf(id) {
            const element = document.getElementById(id);
            return element ? String(element.value || "").trim() : "";
        }

        function setPrintValue(id, value) {
            const element = document.getElementById(id);

            if (element) {
                element.textContent = value || "—";
            }
        }

        function formatDate(value) {
            if (!value) {
                return "—";
            }

            const date = new Date(value + "T00:00:00");

            if (Number.isNaN(date.getTime())) {
                return value;
            }

            return date.toLocaleDateString("en-PK", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            });
        }

        function generateApplicationNumber() {
            const year = new Date().getFullYear();
            const random = Math.floor(100000 + Math.random() * 900000);
            return "MSCST-" + year + "-" + random;
        }

        function validateAdmissionForm() {
            if (!admissionForm) {
                return false;
            }

            if (!admissionForm.checkValidity()) {
                admissionForm.reportValidity();
                return false;
            }

            if (!studentPhoto || !studentPhoto.files || !studentPhoto.files.length) {
                window.showNotification(
                    "Photo Required",
                    "Please upload the student's photograph.",
                    "error"
                );
                return false;
            }

            return true;
        }

        function populateStudentPrintFile() {
            const applicationNumber = generateApplicationNumber();

            setPrintValue("printApplicationNo", applicationNumber);
            setPrintValue(
                "printApplicationDate",
                new Date().toLocaleDateString("en-PK", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                })
            );
            setPrintValue(
                "printAdmissionStatus",
                valueOf("admissionStatus") || "Pending"
            );

            setPrintValue("printStudentName", valueOf("studentName"));
            setPrintValue("printGuardianName", valueOf("guardianName"));
            setPrintValue("printDob", formatDate(valueOf("dob")));
            setPrintValue("printGender", valueOf("gender"));
            setPrintValue("printClassApply", valueOf("classApply"));
            setPrintValue("printPreviousSchool", valueOf("previousSchool"));
            setPrintValue("printPreviousClass", valueOf("previousClass"));
            setPrintValue("printPreviousResult", valueOf("previousResult"));

            setPrintValue("printPhone", valueOf("studentPhone"));
            setPrintValue("printEmail", valueOf("studentEmail"));
            setPrintValue("printAddress", valueOf("studentAddress"));
            setPrintValue("printAdditionalInfo", valueOf("additionalInfo"));

            setPrintValue("printRegistrationNo", valueOf("registrationNo"));
            setPrintValue("printDateReceived", formatDate(valueOf("dateReceived")));
            setPrintValue("printClassAllotted", valueOf("classAllotted"));
            setPrintValue("printSectionAllotted", valueOf("sectionAllotted"));
            setPrintValue("printRollNumber", valueOf("rollNumber"));
            setPrintValue("printFeeStatus", valueOf("feeStatus"));
            setPrintValue("printOfficialRemarks", valueOf("officialRemarks"));
            setPrintValue("printAdmissionOfficer", valueOf("admissionOfficer"));
            setPrintValue("printAuthorizedSignature", valueOf("authorizedSignature"));

            if (printStudentPhoto && uploadedStudentPhoto) {
                printStudentPhoto.src = uploadedStudentPhoto;
                printStudentPhoto.style.display = "block";
            }

            return applicationNumber;
        }

        if (admissionForm) {
            admissionForm.addEventListener("submit", function (event) {
                event.preventDefault();

                if (!validateAdmissionForm()) {
                    return;
                }

                const submitButton = admissionForm.querySelector(
                    'button[type="submit"], input[type="submit"]'
                );

                const originalText = submitButton
                    ? submitButton.innerHTML
                    : "";

                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.innerHTML =
                        '<span class="spinner"></span> Preparing Student File...';
                }

                try {
                    const applicationNumber = populateStudentPrintFile();

                    // Store the generated number in the official-use field.
                    const applicationField = document.getElementById("applicationNo");
                    if (applicationField) {
                        applicationField.value = applicationNumber;
                    }

                    window.showNotification(
                        "Application Ready",
                        "Your student file is ready. Select 'Save as PDF' in the print window.",
                        "success"
                    );

                    // Close modal before printing for a clean A4 print.
                    closeAdmissionModal();

                    window.setTimeout(function () {
                        window.print();
                    }, 350);

                } catch (error) {
                    console.error("Admission form error:", error);

                    window.showNotification(
                        "Error",
                        "Something went wrong while preparing the student file.",
                        "error"
                    );
                } finally {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalText;
                    }
                }
            });
        }


        /* =====================================================
           BACK TO TOP
        ===================================================== */
        const backToTop = document.getElementById("backToTop");

        if (backToTop) {
            function updateBackToTop() {
                backToTop.classList.toggle("show", window.scrollY > 500);
            }

            window.addEventListener("scroll", updateBackToTop, { passive: true });
            updateBackToTop();

            backToTop.addEventListener("click", function () {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });
        }


        /* =====================================================
           ESCAPE KEY
        ===================================================== */
        document.addEventListener("keydown", function (event) {
            if (event.key !== "Escape") {
                return;
            }

            closeAdmissionModal();
            closeLightbox();

            if (navMenu) {
                navMenu.classList.remove("open", "active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

    });

})();
