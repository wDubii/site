document.addEventListener("DOMContentLoaded", () => {
    const EntryScreen = document.getElementById("EntryScreen")
    const MainContent = document.getElementById("MainContent")
    const FloatingControls = document.getElementById("FloatingControls")
    const Music = document.getElementById("Music")
    const ThemeToggle = document.getElementById("ThemeToggle")
    const VolumeControl = document.getElementById("VolumeControl")
    const VolumeFill = document.getElementById("VolumeFill")
    const YearElement = document.getElementById('year')
    const Html = document.documentElement

    const SetRandomSong = () => {
        if (!Music) return

        const Theme = Html.classList.contains("dark") ? "Dark" : "Light"

        const SongCounts = {
            Dark: 1,
            Light: 1
        }

        const MaxSongs = SongCounts[Theme] || 1
        const RandomNumber = Math.floor(Math.random() * MaxSongs) + 1

        Music.src = `/Songs/${Theme}/${RandomNumber}.mp3`
        Music.load()
        Music.play().catch(Error => console.log("Audio play failed:", Error))
    }

    // Volume Control
    if (VolumeControl && VolumeFill && Music) {
        Music.volume = 0.15
        VolumeFill.style.height = `${(Music.volume * 4) * 100}%`

        const UpdateVolume = (E) => {
            const Rect = VolumeControl.getBoundingClientRect()
            const Y = Rect.bottom - E.clientY
            let Percent = Y / Rect.height
            Percent = Math.max(0, Math.min(1, Percent))
            Music.volume = Percent / 4
            VolumeFill.style.height = `${Percent * 100}%`
        }

        let IsDragging = false

        VolumeControl.addEventListener("mousedown", (E) => {
            IsDragging = true
            UpdateVolume(E)
        })

        document.addEventListener("mousemove", (E) => {
            if (IsDragging) UpdateVolume(E)
        })

        document.addEventListener("mouseup", () => {
            IsDragging = false
        })
    }

    // Entry Screen
    if (EntryScreen) {
        EntryScreen.addEventListener("click", () => {
            EntryScreen.style.opacity = "0"
            setTimeout(() => {
                EntryScreen.style.display = "none"
                MainContent.classList.remove("hidden")
                FloatingControls.classList.remove("hidden")
                FloatingControls.classList.add("flex")
                void MainContent.offsetWidth
                MainContent.style.opacity = "1"
                    SetRandomSong()
            }, 500)
        })
    }

    // Theme Toggle
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        Html.classList.add("dark")
    } else {
        Html.classList.remove("dark")
    }

    if (ThemeToggle) {
        ThemeToggle.addEventListener('click', () => {
            const Css = document.createElement('style')
            Css.textContent = `* { transition: none !important }`
            document.head.appendChild(Css)

            Html.classList.toggle('dark')
            if (Html.classList.contains('dark')) {
                localStorage.theme = 'dark'
            } else {
                localStorage.theme = 'light'
            }

            window.getComputedStyle(Css).opacity
            document.head.removeChild(Css)
                                SetRandomSong()
        })

    }

    YearElement.textContent = new Date().getFullYear()

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute('href'))
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        })
    })
})