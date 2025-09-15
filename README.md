# MyCareGorithm Sprint Analytics Dashboard
## GitHub Pages Deployment

### 🌐 Live Dashboard
Access the live dashboard at: `https://[your-username].github.io/[repository-name]/`

### 📁 GitHub Pages Structure
```
github-pages/
├── index.html              # Main dashboard (GitHub Pages entry point)
├── data/                   # Sprint data files
│   ├── sprint-25Q309-S1.json
│   └── [future sprint JSON files]
├── README.md              # This file
└── .github/               # GitHub Actions (optional)
```

### 🚀 Deployment Instructions

#### **Initial Setup**
1. **Create GitHub Repository** (if not exists)
2. **Enable GitHub Pages** in repository settings
3. **Set source** to `main` branch `/github-pages` folder
4. **Upload this folder** to your repository

#### **For Each New Sprint Analysis**
1. **Run local analysis** using "ANALYZE SPRINT" keyword
2. **Copy generated JSON** from local analysis to `data/` folder
3. **Update index.html** if needed (usually automatic)
4. **Commit and push** to GitHub
5. **Dashboard updates** automatically via GitHub Pages

### 📊 Current Sprint Data
- **Sprint 25Q309-S1**: Complete analysis with executive value summary
- **Team Performance**: 8 developers with velocity tracking
- **Business Value**: Time savings, market expansion, efficiency gains
- **Charts**: 6 interactive visualizations with real data

### 🔄 Adding New Sprints

#### **Local Process** (Using Cursor Agent)
```
@(6) Sprints/

ANALYZE SPRINT

Sprint ID: [NEW-SPRINT-ID]
Start Date: [YYYY-MM-DD]
End Date: [YYYY-MM-DD]
CSV: [attach Jira export]
```

#### **GitHub Upload Process**
1. **Copy generated JSON** to `github-pages/data/sprint-[ID].json`
2. **Update sprint selector** in `index.html` (add new option)
3. **Commit changes** to repository
4. **GitHub Pages** automatically deploys updates

### 🎯 Benefits of GitHub Pages Deployment

#### **Accessibility**
- **Live web dashboard** accessible from anywhere
- **Stakeholder sharing** via simple URL
- **Mobile responsive** for viewing on any device
- **Always up-to-date** with latest sprint data

#### **Version Control**
- **Sprint history** tracked in Git commits
- **Change tracking** for all dashboard updates
- **Rollback capability** if needed
- **Team collaboration** on sprint analysis

#### **Professional Presentation**
- **Clean URLs** for stakeholder sharing
- **Fast loading** via GitHub's CDN
- **SSL security** with HTTPS
- **Professional hosting** without infrastructure costs

### 📋 Maintenance

#### **Regular Updates**
- **New sprint data** added to `data/` folder
- **Dashboard updates** pushed to repository
- **Historical data** preserved in version control
- **System improvements** tracked via commits

#### **Quality Assurance**
- **Test locally** before pushing to GitHub
- **Validate JSON** data format
- **Check chart rendering** in browser
- **Verify responsive design** on mobile

### 🔧 Technical Notes

#### **JSON Data Format**
Each sprint requires a JSON file with:
- Sprint configuration (dates, story points, team size)
- Performance metrics (velocity, completion, forecasting)
- Executive summary (time savings, market impact, efficiency)
- Team performance (individual velocity and themes)
- Chart data (status distribution, epic progress, etc.)

#### **Browser Compatibility**
- **Modern browsers** with ES6 support required
- **Chart.js** loaded from CDN for visualizations
- **Responsive design** works on desktop and mobile
- **Local storage** for user preferences

---

**Repository Setup**: Ready for GitHub Pages deployment  
**Main File**: `index.html` (GitHub Pages entry point)  
**Data Format**: JSON files in `data/` folder  
**Update Process**: Local analysis → JSON copy → GitHub push → Auto-deploy
