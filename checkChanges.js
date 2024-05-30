const simpleGit = require('simple-git');
const path = require('path');

const git = simpleGit();

async function checkSidenavChanges() {
    try {
        // Get the list of changed files
        const statusSummary = await git.status();
        const changedFiles = statusSummary.files.map((file) => file.path);

        // Check if any of the changed files are in the sidenav folder
        const sidenavPath = path.join('sidenav');
        const hasSidenavChanges = changedFiles.some((file) => file.startsWith(sidenavPath));

        return hasSidenavChanges;
    } catch (error) {
        console.error('Error checking sidenav changes:', error);
        return false;
    }
}

checkSidenavChanges().then((hasSidenavChanges) => {
    console.log(`Has sidenav changes: ${hasSidenavChanges}`);
    if (hasSidenavChanges) {
        process.exit(0); // success
    } else {
        process.exit(1); // failure
    }
});
